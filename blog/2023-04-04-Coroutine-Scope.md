---
title: Coroutine Scope 공유 문제
hide_title: false
hide_table_of_contents: false
sidebar_label: Coroutine Scope 공유 문제
sidebar_position: 1
keywords:
  - kotlin
  - coroutine
  - scope
  - spring
authors: [haekyu]
tags: [kotlin, coroutine, scope, spring]
image: /img/my_picture.jpg
slug: /coroutine-scope
---

- 쿠버네티스 Pod Kafka 컨슈머의 Bean 생성 실패 현상
- Coroutine Scope 공유로 인한 이벤트 간 상호 취소 문제 해결 경험

<!-- truncate -->

## 쿠버네티스 Pod에서 실행하는 Kafka 컨슈머의 Bean 생성 실패 현상

### 문제 상황

Admin도메인의 컨슈머를 쿠버네티스 Pod으로 전환 후 실행시 Spring Bean 생성이 실패함

### 문제 분석

![dispatcher](/img/consumer-dispatcher.png)

문제의 코드는 다음과 같다. Runtime 클래스를 사용하여 현재 사용 가능한 CPU 프로세스를 가져와 FixedThreadPool을 생성하는 코드이다.

```kotlin
Executors.newFixedThreadPool((10 * Runtime.getRuntime().availableProcessors()) / Topic.SIZE)
```

그런데 `Runtime.getRuntime().availableProcessors()` 의 값은 helm chart values.yaml에서 선언한 `resources.requests.cpu`, `resources.limits.cpu` 값이고, 이 값은 0.5로 설정되어 있다.

토픽의 개수(Topic.SIZE)는 약 13개 정도이며, 결국 총 계산한 값은 (10 \* 0.5) / 13 이므로 **5/13** 이 된다. `Executors.newFixedThreadPool()` 에서 받는 파라미터는 Int이므로 계산된 값은 0이 되어 오류 발생함

### 해결책

레거시 VM에서는 컨테이너에서 CPU를 제한하지 않고 있었으며, 호스트의 CPU는 4코어라서 `Executors.newFixedThreadPool()`에서 에러가 발생하지 않았다. 반면 K8S에서는 리소스 제한을 두고 있으며, 제한을 두는 것을 권장하고 있다. **그래서 K8S 환경에서는 CPU정보에 의존적인 코드를 모두 확인해야 한다.**

## 코루틴 Scope 공유로 인한 이벤트 간 상호 취소 문제 해결

### 문제 상황

기존 코드의 문제는 하나의 이벤트 리스너에서 같은 코루틴 스코프로 자식 코루틴을 만들어 사용하는 방식 때문에 **다른 이벤트가 처리되지 않는 문제** 발생

### 분석 1. 동일한 코루틴 스코프에서 코루틴 생성 시 문제점

`OptionEventListener.kt` 파일의 기존 코드:

```kotlin
class OptionEventListener(
    threadPoolComponent: ThreadPoolComponent,
) {
    // 코루틴 스코프 생성
    private val eventCoroutineScope = CoroutineScope(threadPoolComponent.eventDispatcher)

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    fun createOptionHistory(event: OptionCUEvent) {
        eventCoroutineScope.launch {
            transaction.runInTransaction {
                // this.isActive
            }
            syncSlaveOption(event.updatedOptions)
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    fun createDeletedOptionHistory(event: OptionDeleteEvent) {
        eventCoroutineScope.launch {
            transaction.runInTransaction {
                // this.isActive
            }
        }
    }
}
```

**문제점:**

- 하나의 스코프(부모 코루틴)에 각각 1번 코루틴 자식, 2번 코루틴 자식이 생성됨
- 1번 이벤트와 2번 이벤트가 부모 스코프를 통해 서로 연결됨
- 1번과 2번 중 하나라도 예외가 발생하면 나머지 하나는 동작하지 않음
- 1번 이벤트 코루틴에서 예외 발생 시 해당 스코프의 `isActive`가 false가 되고, 다른 자식 코루틴은 모두 취소됨

### 분석 2. SupervisorJob 사용 시에도 발생하는 문제

`ProductEventListener.kt` 파일의 예시:

```kotlin
class ProductEventListener(
    threadPoolComponent: ThreadPoolComponent,
) {
    // 코루틴 스코프 생성
    private val eventCoroutineScope = CoroutineScope(SupervisorJob() + threadPoolComponent.eventDispatcher)

    @EventListener
    fun firstEvent(event: FirstEvent) {
        eventCoroutineScope.launch {
            // A 로직 수행
        }
    }

    @EventListener
    fun secondEvent(event: SecondEvent) {
        eventCoroutineScope.launch {
            // B 로직 수행
        }
    }
}
```

**문제점:**

- SupervisorJob으로 이벤트 간 연결은 끊었지만, 여전히 **부모 스코프 하나가 취소되면 해당 스코프 내의 모든 이벤트가 처리되지 않음**
- 서로 다른 요청을 통해 처리되는 각각의 이벤트는 독립적으로 처리되어야 함

### SupervisorJob이란?

```kotlin
// SupervisorJob 사용 시
val scope = CoroutineScope(SupervisorJob())

scope.launch {
    // 이벤트 A 처리
    throw Exception("A 실패!") // 💥 예외 발생
}

scope.launch {
    // 이벤트 B 처리 - A가 실패해도 B는 계속 실행 ✅
    delay(1000)
    println("B 완료") // 정상 출력됨
}

// 결과: A가 실패해도 B는 독립적으로 계속 실행
```

**실패한 자식만 취소되지만 Job Cancel은 전파됨**

```kotlin
val supervisorJob = SupervisorJob()
val scope = CoroutineScope(supervisorJob)

scope.launch {
    delay(1000)
    println("A 완료")
}

scope.launch {
    delay(1000)
    println("B 완료")
}

// 부모 Job을 직접 취소하면
supervisorJob.cancel() // 모든 자식이 취소됨
// → A, B 모두 출력되지 않음
```

### 해결 방안 1: NonCancellable 활용

```kotlin
class ProductEventListener(
    threadPoolComponent: ThreadPoolComponent,
) {
    // 코루틴 스코프 생성
    private val eventCoroutineScope = CoroutineScope(NonCancellable + threadPoolComponent.eventDispatcher)
}
```

**특징:**

- NonCancellable은 해당 job의 active 상태를 항상 true로 유지
- CancellationException에 영향을 받지 않고 코드를 실행

### 해결 방안 2: 이벤트별 독립적인 코루틴 스코프 생성 (권장)

```kotlin
class ProductEventListener(
    private val threadPoolComponent: ThreadPoolComponent,
) {
    @EventListener
    fun subscribeProductEvent(event: ProductEvent) {
        CoroutineScope(threadPoolComponent.eventDispatcher).launch {
            // ...
        }
    }

    @EventListener
    fun handleProductNotification(event: ProductEvent) {
        CoroutineScope(threadPoolComponent.eventDispatcher).launch {
            // ...
        }
    }
}
```

**장점:**

- 각 이벤트마다 독립적인 스코프를 생성하여 이벤트 간 연관관계 없음
- 한 이벤트의 실패가 다른 이벤트에 영향을 주지 않음

### 적용 결과

#### 성능 개선 효과

독립적인 코루틴 스코프 적용 후 다음과 같은 개선 효과를 확인

1. **이벤트 처리 안정성 향상**

   - 특정 이벤트 처리 실패 시에도 다른 이벤트들은 정상적으로 처리됨
   - 전달 event객체에 trace ID를 넣어 실행 여부 로깅

2. **서비스 가용성 개선**

   - 상품 옵션 변경 시 발생하던 간헐적 동기화 실패 문제 해결
   - 이벤트 처리 실패로 인한 데이터 불일치 현상 제거

#### 운영 개선 사항

- **장애 전파 방지**: 하나의 이벤트 처리 실패가 전체 이벤트 시스템에 영향을 주지 않음
- **복구 시간 단축**: 문제가 발생한 특정 이벤트만 재처리하면 되므로 복구 시간이 대폭 단축
- **시스템 안정성**: 피크 시간대에도 안정적인 이벤트 처리 성능 유지
