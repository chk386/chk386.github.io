---
title: 카프카 컨슈머 장애 경험
hide_title: false
hide_table_of_contents: false
sidebar_label: 카프카 컨슈머 장애 경험
sidebar_position: 1
keywords:
  - kafka
  - consumer
  - oom
  - semaphore
authors: [haekyu]
tags: [kafka, consumer, oom, semaphore]
image: /img/my_picture.jpg
slug: /kafka-consumer
---

주문, 회원 도메인에서 발생한 카프카 컨슈머 장애 관련 경험담

<!-- truncate -->

## 장애 1: 신규가입 쿠폰 / 적립금 지급 지연 장애

- 내용 요약
  - 장애사항 : 쿠폰, 적립금 지급 컨슈머가 동작 안하는 이슈 발생
  - 원인
    - 신규 가입 토픽을 이미 처리하고 있는 컨슈머(쿠폰, 적립금 지금)가 있는 상황에서 추가로 회원가입 웹훅을 위한 컨슈머 배포
    - 새로운 컨슈머를 개발할때 copy & paste로 동일한 그룹아이디를 가진 컨슈머를 띄움. 해당 컨슈머로 인해 기존 프로모션 지급 컨슈머가 동작을 안함

### 컨슈머 그룹

- 컨슈머는 그룹 단위로 offset을 관리한다.
- 따라서 하나의 컨슈머가 장애 발생 시 같은 그룹 안에 다른 컨슈머가 이어받아 읽을 수 있게 리밸런싱 작업이 일어난다.
- 즉, 컨슈머 그롭은 HA(High Availability)를 위해 `FAIL OVER`의 기능을 담당한다고 보면 된다.
- 하나의 컨슈머가 일을 하는 동안 그룹 내 나머지 컨슈머들은 `스탠바이 상태로 대기`하는 것
  - 이 것 때문에 같은 그룹아이디에 쿠폰, 적립금 지급 컨슈머가 대기상태로 암것도 안하고 있던 것임.

## 장애 2: 메세징 컨슈머 OOM 발생

- 내용 요약
  - 장애 사항 : 이달초 개인정보 이용 노티 배치가 돌면서 200만건이 넘게 토픽 레코드가 쌓였는데 컨슈머에서 이를 처리하려다가 OOM이 발생한 이슈.
  - 원인 : 컨슘 속도를 올리기 위해서 사용된 잘못된 비동기 처리 코드로 대량의 대기 객체가 쌓여서 발생
    - 기존 동기방식의 메세지 컨슘은 메세지를 보내고 받기까지 기다리는 동안 일을 하지 못하는 이슈가 발생
    - 따라서 토픽 컨슘 자체를 비동기로 처리하도록 짬.
    - 비동기로 대량의 컨슘을 동시에 진행할 시 문제가 될 수 있으니 [세마포어](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.sync/with-permit.html)를 이용 특정 횟수만 동시에 진행되도록 개발
    - 문제 발생 코드
    ```Kotlin
    override fun subscribe(topicName: String, groupId: String, bufferSize: Int) {
        val semaphore = Semaphore(bufferSize)
        kafkaConsumerConfig.kafkaReceiver(topicName, groupId)
            .receive()
            .subscribe {
                consumeCoroutineJob = consumerCoroutineScope.launch {
                    semaphore.withPermit {
                        process(it)
                    }
                }
            }
    }
    ```
  - 오해
    - process()안에서 `offset.acknowledge()`를 하고 있고 세마포어로 인해 bufferSize만큼만 process()안으로 진입할 수 있으니 데이터 컨슘은 bufferSize만큼만 해야 하는 거 아닌가?

### 카프카가 데이터를 읽는 방식

- 카프카는 특정 오프셋을 시작으로 메세지를 `읽어드리는(Poll) 방식`이다.
- 각 그룹의 파티션은 마지막으로 소비된 메세지(ack를 받은)의 offset을 기억한다.
- 이 `offset의 용도는 장애복구, 재시작, 리밸런싱등으로 컨슈머가 최초 구독을 시작할때 읽는 토픽의 시작 위치이다.`
- 즉, 위에서 우리가 오해했던 offset의 ack()를 보내야 다음 토픽을 읽어드리는 것이 아니라 한번 구독이 시작되면 ack()와는 상관없이 메세지를 읽어들이게 된다.
- 위 코드는 결국 bufferSize만큼은 process()로 들어가고 그 외는 지속적으로 launch를 만나서 계속 다음 메세지를 읽어들이고 있었기 때문에 결국 힙메모리에는 세마포어 허가를 기다리는 객체들이 쌓여서 OOM이 발생한 것이다.

### 컨슈머의 성능을 올리기 위한 방법

- 여러가지 방법이 있겠으나 우리 코드에 적용된 부분은 다음의 두개가 있다.

  - `파티션`을 쪼개서 병렬로 토픽의 메세지를 처리한다.
  - Reactor에서 제공하는 `Flux의 buffer기능`을 이용 최대한 모아서 처리한다.

    - 메세지를 특정 MAX_SIZE로 모아서 한번에 처리함(MAX_SIZE까지 안쌓여도 MAX_TIME만 기다리면 모아서 넘긴다.)

    ```Kotlin
    override fun subscribe(topicName: String, groupId: String, bufferingTime: Long, bufferSize: Int) {
        consumeCoroutineJob = consumerCoroutineScope.launch {
            kafkaConsumerConfig.kafkaReceiver(topicName, groupId)
                .receive()
                .bufferTimeout(bufferSize, Duration.ofSeconds(bufferingTime))
                .asFlow()
                .collect {
                    process(it)
                }
        }
    }
    ```

    - 처리 후에는 제일 마지막 offset을 ack()처리 한다.

    ```Kotlin
    private suspend fun process(receiverRecords: List<ReceiverRecord<String, String>>) {
        try {
            this.consumeMessage(receiverRecordList)
        } catch (e: Exception) {
                ....
        } finally {
            receiverRecordList.last().receiverOffset().acknowledge()
        }
    }
    ```

    - 단위 리스트를 처리할떄는 비동기로 한번에 처리한다.

    ```Kotlin
    override suspend fun consumeMessage(receiverRecords: List<ReceiverRecord<String, String>>) {
        coroutineScope {
            val deferredJobs = receiverRecords.map { receiverRecord ->
                val request = receiverRecord.extractValue<BulkNotificationSendRequest>(Topic.SEND_BULK_NOTIFICATION)
                log.info("send bulk notification request: ${receiverRecord.value()}")
                async {
                    notificationService.send(request.toNotificationSendCommand())
                }
            }
            deferredJobs.awaitAll() // 단위 리스트단위로만 비동기로 처리되게 기다려 줌.
        }
    }
    ```

### 파티션

- 컨슈머 그룹 안에서 토픽의 레코드를 분리시켜서 각 컨슈머에서 `병렬로 처리`를 할 수 있게 해주는 것
- 각 파티션은 `각자의 offset을 가진다.`
- 파티션의 단점?
  - 파티션이 많으면 카프카(브로커)가 죽었을 때 장애 회복이 느리다.
  - 각 `파티션간에는 순서가 보장되지 않으므로`(각자의 offset으로 관리) 순차적 실행이 필요할경우 문제가 된다.
    - 예시
      - 네이버페이 주문형은 배치를 통해 네이버로 부터 데이터를 끌어와서 주문 데이터를 동기화 합니다.
      - 고도몰과 샵바이는 카프카 토픽으로 이 처리를 진행합니다.
      - 주문생성 -> 결제완료 -> 상품준비중 이렇게 순차적으로 수행 되어야 하는 토픽이 각 파티션으로 쪼개진다면 이 순서가 보장받지 못합니다.
    - 해결
      - 카프카는 기본적으로 ROUND ROBIN 방식으로 파티션을 분배합니다.
      - `파티션 키가 있다면 키의 해싱값을 통해서 레코드를 특정 파티션으로 분배하는 룰`을 만들 수 있습니다.
      - 우리는 몰단위로 키를 분배할 수 있도록 하여 몰단위로는 순차적 실행이 보장되도록 개발이 되었습니다.
    - 여전한 문제(Hotspot Problem)
      - 각 몰마다 주문의 양에서 차이가 나기 때문에 특정 파티션으로 레코드가 몰리게 되는 문제가 발생할 수 있습니다.

