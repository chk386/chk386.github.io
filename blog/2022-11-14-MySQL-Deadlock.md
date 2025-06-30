---
title: MySQL Deadlock 경험
hide_title: false
hide_table_of_contents: false
sidebar_label: MySQL Deadlock 경험
sidebar_position: 1
keywords:
  - MySQL
  - transaction
  - deadlock
  - isolation
authors: [haekyu]
tags: [MySQL, transaction, deadlock, isolation]
image: /img/my_picture.jpg
slug: /mysql/deadlock
---

**재고 Summary 테이블의 데드락 해결 경험** <br />

- MySQL의 격리 수준(Isolation Level), 데드락 발생한 원인과 해결 방법에 대한 설명

<!-- truncate -->

# 재고 Summary 테이블 업데이트에 의한 MySQL 데드락 경험

## 트랜잭션의 격리 수준

### MySQL의 트랜잭션 격리 수준

- Mysql의 트랜잭션 격리 수준은 아래 쿼리로 조회 가능
  - `show variables like '%isolation';`
  - ![image.png](/img/deadlock1.png)
  - 사용중인 DB 격리수준은 REPEATABLE-READ(MySQL 디폴트)가 적용됨
- 일반적으로 사용하는 격리 수준은 REPEATABLE-READ와 READ-COMMITTED
  - `READ-UNCOMMITTED`와 `SERIALIZABLE`은 너무 극단적인 형태라 사용X

### REPEATABLE-READ와 READ-COMMITTED의 차이

- REPEATABLE-READ(MySQL의 기본 격리 수준)와 READ-COMMITTED(Oracle의 기본 격리 수준)의 차이를 아래 예시와 같이 나타내면 다음과 같다.
- 참고: (저수준 격리) `READ-UNCOMMITTED` < READ-COMMITTED < REPEATABLE-READ < `SERIALIZABLE` (고수준 격리)

| 예시1 | Transaction 1                                                                                                     | Transaction 2                                                           |
| ----- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 0     | BEGIN                                                                                                             | BEGIN                                                                   |
| 1     | **SELECT** mall_product_name **FROM** pd_mall_product **WHERE** mall_product_no = 1 `=>(select 결과: 영화관람권)` |                                                                         |
| 2     |                                                                                                                   | **UPDATE** pd_mall_product **SET** mall_product_name = '영화관람권 2매' |
| 3     |                                                                                                                   | **COMMIT**                                                              |
| 4     | **SELECT** mall_product_name **FROM** pd_mall_product **WHERE** mall_product_no = 1 `=>(select 결과: *A )`        |                                                                         |

- `*A` 결과값 ==> 여기서 REPEATABLE-READ라면 `영화관람권`을, READ-COMMITTED라면 `영화관람권 2매`를 출력합니다.
  - REPEATABLE-READ은 transaction을 시작했을 때, 데이터 변경이 일어나도 \***UNDO영역**에서 데이터를 조회해오므로, 반복적인 읽기를 보장합니다.
    - `*'UNDO 영역'이란 롤백을 대비하여 update하기 전 데이터를 저장해두는 공간을 말합니다.`
  - 반면 READ-COMMITTED의 경우에는 transaction을 시작한 이후에, 다른 transaction에서 데이터를 update하고, commit까지 했다면 재조회 시에 결과가 달라질 수 있습니다.(**Unrepeatable-read 문제** - READ-COMMITTED에 한함.)
    - 즉, 다른 transaction에서 commit하기 전까지는 UNDO 영역에서 데이터를 조회하고, commit 이후에는 변경이 완료된 테이블에서 데이터를 조회해오기 때문에 결과값이 달라집니다.
- **성능 측면**
  - 성능면에서 봤을 때, 격리 수준이 낮은 READ-COMMITTED가 더 좋습니다.
  - 이유는 REPEATABLE-READ와 READ-COMMITTED 모두 Undo 영역을 사용하기는 하지만, REPEATABLE-READ은 다른 트랜잭션에서 COMMIT을 한 이후에도 자신의 트랜잭션이 끝나기 전까지 Undo 영역을 유지하기 때문입니다.
  - 따라서 UNDO 영역을 유지하는 것, 즉 백업 데이터를 덜 쌓아두는 READ-COMMITTED이 성능 측면에선 더 낫다고 볼 수 있습니다.

<br/>
### REPEATABLE-READ 에서 발생할 수 있는 문제( READ-COMMITTED에서도 동일하게 발생 )

- **PHANTOM READ**
  - 동일한 트랜잭션 내에서 select 문을 실행했을 때, 다른 결과값이 나오는 현상
  - 아래와 같은 상황에서 REPEATABLE-READ 격리 수준에서 **PHANTOM READ**가 발생합니다.
    - `target_table` => (id, number)

| 예시2 | Transaction 1                                                | Transaction 2                                   |
| ----- | ------------------------------------------------------------ | ----------------------------------------------- |
| 0     | BEGIN;                                                       | BEGIN;                                          |
| 1     | **SELECT** **COUNT(\*)** **FROM** target_table; `=> 0개`     |                                                 |
| 2     |                                                              | **insert into** target_table **values** (1, 1); |
| 3     |                                                              | **COMMIT;**                                     |
| 4     | **SELECT COUNT(\*) FROM** target_table; `=> 0개`             |                                                 |
| 5     | **UPDATE** target_table **SET** number = 2 **WHERE** id = 1; |                                                 |
| 6     | **SELECT COUNT(\*) FROM** target_table; `=> 1개`             |                                                 |

- 아직 트랜잭션이 종료되지 않은 Transaction 1에서도 `UPDATE` 실행 후 count가 1개 증가됨.

## LOCK 종류

- LOCK 자체의 종류는 많지만, 데드락과 관련이 있는 S Lock과 X Lock 2가지에 대해서만 간단하게 정리
  - `S Lock`(공유 잠금)
    - Shared Lock으로 일반적인 select 시에는 S lock을 사용하지 않고, `lock in share mode`와 같은 명령어를 통해서 사용합니다.
    - S lock의 경우에는 여러 트랜잭션이 하나의 자원에 대해 같은 S lock을 걸 수 있습니다.
    - 하지만 S lock이 이미 걸린 자원에 대해 또 다른 트랜잭션이 X lock을 걸 수는 없습니다.
    - 자원을 읽는 동안 수정이 발생하지 않게 하기 위해 사용합니다.
    - write만 막는다.
  - `X Lock`(쓰기 잠금) - exclusive Lock으로 update 시에 사용합니다. - X Lock이 걸리면 다른 트랜잭션에서 S Lock과 X Lock을 모두 같은 자원에 대해 걸 수 없습니다. - 단, 일반적인 select 쿼리의 경우엔 S lock을 걸지 않으므로 조회는 가능합니다. - read/write 모두 막는다

**둘다 비관적 락(pessimistic lock) 이다.**

## 기능 설명

- 상품 도메인에는 `재고연동상품`이라는 것이 있다.
- `재고연동상품`은 다음과 같다.
  - 기존에 만든 A 상품이 있는 상황에서
  - A 상품을 복사하여 B 상품을 만드는데, `재고연동` 옵션을 선택
    - 복사
      - ![image.png](/img/deadlock2.png)
    - 재고연동
      - ![image.png](/img/deadlock3.png)
  - 이렇게 되면 A와 B는 서로 `재고가 연동된 상품`이 된다.(`A -> B로 복사했으므로, A는 B의 '부모상품'이다.`)
  - 다시말해, A의 1번 옵션이 1개 팔리면(`A의 1번 옵션의 재고 1개 차감`), B의 1번 옵션에 붙어있는 재고도 1개가 차감됩니다.(`반대의 경우도 마찬가지이다`.)
    - A: 001(optionNo) - 001(stockNo)
    - B: 002(optionNo) - 001(stockNo)
    - 위처럼 서로 옵션 번호는 다르지만, 옵션 정보는 같고 각각 A와 B의 옵션은 서로 같은 stockNo를 바라보는 구조가 바로 `재고연동상품`이다.
  - 따라서 A의 상품에 변경(예를 들어, 상품 정보 수정 - 재고 변경 / 판매) 등의 이벤트가 생기면 A뿐만 아니라 A에 관계된 모든 상품에 대해 `재고를 update` 해야한다.

## 문제 해결

### 데드락이 발생한 로직 살펴보기

- 먼저 데드락 로그를 보기 전에 `데드락이 발생한 로직 - 하나의 트랜잭션 내에서 이루어지는 로직`을 보면 이해가 쉽다
- 바로 위에서 설명한 `재고연동상품`의 경우, 아래와 같은 로직이 `하나의 트랜잭션` 내에서 이루어진다.

| 순서 | 로직                                                                                                                                                                                                                                                      | 추가설명                                               |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1    | UPDATE option set xxx = 123 where stock_no = 1000;                                                                                                                                                                                                        | 요청받은 상품의 옵션만 수정                            |
| 2    | `INSERT INTO '재고summary' SELECT 'option' INNER JOIN stock`<br/><br/>위 구문을 풀어보면<br/>재고summary테이블 테이블과 재고 테이블을 join해서 옵션 정보와 재고 정보 조회 (select)한 결과를 `재고summary` 테이블에 insert 또는 update **(insert select)** | 요청받은 상품의 옵션과 `재고연동상품의 옵션 모두` 조회 |

- 여기서 2번은 `insert into ... select` 으로 하나의 로직
- 문제는 1번에서 `update` 요청으로 옵션에 대한 X 락을 획득할텐데, 그렇다면 2번에서 `insert into ... select`에서 옵션을 잘 조회해올 수 있을까?

### 데드락 로그

- 실제 리얼 환경에서 발생한 데드락 로그를 살펴보자

```
*** (1) TRANSACTION:
TRANSACTION 1417301238, ACTIVE 0 sec starting index read

*** WAITING FOR THIS LOCK TO BE GRANTED:
RECORD LOCKS space id 12938 page no 1225799 n bits 152 index PRIMARY of table `옵션테이블` trx id 1417301238 lock mode S locks rec but not gap waiting
Record lock, heap no 28 PHYSICAL RECORD: n_fields 32; compact format; info bits 0

==================================================================

*** (2) TRANSACTION:
TRANSACTION 1417301239, ACTIVE 0 sec starting index read

*** HOLDS THE LOCK(S):
- insert into `재고summary테이블` ...
- RECORD LOCKS space id 12938 page no 1225799 n bits 152 index PRIMARY of table `옵션테이블` trx id 1417301239 lock_mode X
- Record lock, heap no 28 PHYSICAL RECORD: n_fields 32; compact format; info bits 0

*** WAITING FOR THIS LOCK TO BE GRANTED:
- insert into `재고summary테이블`
- RECORD LOCKS space id 12938 page no 1621251 n bits 152 index PRIMARY of table `옵션테이블` trx id 1417301239 lock mode S locks rec but not gap waiting
- Record lock, heap no 76 PHYSICAL RECORD: n_fields 32; compact format; info bits 0

==================================================================

*** WE ROLL BACK TRANSACTION (1)
```

- 보기 어렵지만 추후 데드락이 났을 때 이걸 참고해서 보시면 이해가 빠를 것 같아서 첨부
- 위에서 간추린 로그를 해석해 보면..
  Transaction 1: heap no 76 보유? → heap no 28 S Lock 대기
  Transaction 2: heap no 28 X Lock 보유 → heap no 76 S Lock 대기

Transaction 1 (1417301238)

- 대기 중: 옵션 테이블의 heap no 28 레코드에 S Lock(공유락) 요청
- 상태: 락을 얻지 못해 대기

Transaction 2 (1417301239)

- 보유 중: 옵션 테이블의 heap no 28 레코드에 X Lock(배타락) 보유
- 대기 중: 같은 테이블의 heap no 76 레코드에 S Lock(공유락) 요청

| 데드락 예시 | Transaction 1417301238 (1번 트랜잭션)             | Transaction 1417301239 (2번 트랜잭션)             | 설명     |
| ----------- | ------------------------------------------------- | ------------------------------------------------- | -------- |
| 0           |                                                   | A 데이터(heap no 28) 에 대해 X lock을 획득        | 1번 로직 |
| 1           | B 데이터(heap no 76) 에 대해 X lock을 획득        |                                                   | 1번 로직 |
| 2           | A 데이터(heap no 28) 에 대해 S lock 획득 **대기** |                                                   | 2번 로직 |
| 3           |                                                   | B 데이터(heap no 76) 에 대해 S lock 획득 **대기** | 2번 로직 |

### 원인

#### 1. S lock

- 표의 2번과 3번줄에서 1번 트랜잭션과 2번 트랜잭션 모두 S lock을 획득하려고 했기 떄문.
- 만약 S lock을 획득할 필요가 없다면, 데드락은 발생 X

#### 2. 트랜잭션의 격리수준

- MySQL의 기본 격리 수준인 REPEATABLE-READ에서는 `insert into ... select`나 `create table ... as select`와 같은 구문을 실행할 때, 현재의 select 버전을 보장하기 위해 SnapShot을 이용하는데 이는 lock과 같은 효과를 가진다. => 이 때문에 표에서 `2번 로직`에서 표와 같이 S lock이 발생하였음
- 반면 READ-COMMITTED의 경우에는 REPEATABLE-READ과 달리 `insert into ... select`와 같은 쿼리에서도 S lock을 걸지 않음.

### 해결 방법

**결과적으로 재고 요약 테이블의 데드락을 해결하는 방법은 간단하였다**

- mysql의 기본 격리 수준인 REPEATABLE-READ을 사용하지 않고, READ-COMMITTED을 적용하도록 하여 데드락이 발생하지 않는 것을 확인함
- 비지니스 로직상 여러명의 유저가 같은 옵션, 재고를 수정하는것이 아니여서 격리 수준 변경이 비지니스에 영향을 미치지 않는 다고 판단함
