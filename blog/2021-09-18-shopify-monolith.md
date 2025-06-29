---
title: Inside Shopify's Tech Stack 번역
hide_title: false
hide_table_of_contents: false
sidebar_label: Inside Shopify's Tech Stack 번역
sidebar_position: 1
keywords:
  - monolith
  - shopify
  - ruby
authors: [haekyu]
tags: [monolith, ruby, shopify]
image: /img/my_picture.jpg
slug: /shopify
---

[원문](https://stackshare.io/shopify/e-commerce-at-scale-inside-shopifys-tech-stack)
글로벌 커머스 플랫폼 탑티어 Shopify의 기술 스택 포스팅을 번역하여 개발팀 공유한 내용

<!-- truncate -->

## Background

Shopify는 샵을 만들고 당신이 원하는 어디서건(웹스토어, sns, offline pos) 물건을 판매 할수 있는 smb를 위한 multi-channel commerce platform입니다.
Shopify는 60만 merchants들을 움직이며 피크시 `초당 8만` requests를 제공한다.

Shopify는 성공을 위한 기업가들에게 상점을 런칭하는것을 도우면서 또한 super bowl, kylie cosmetics 그리고 셀럽(저스틴 비버, 카니에 웨스트)들에게 세계에서 가장 매출을 올려 주고있다.
`깜짝 판매(flash sales)`같은 것 들은 예상할수 없는 큰 트래픽 볼륨 때문에 엔지니어링 관점에서 다루기 어렵다.

내 이름은 kir shartrov이고 Shopify service patterns team에서 일하고 있는 senior production engineer이다. 우리 팀은 플랫폼의 sharding, scalability and reliability와 같은 영역을 담당하고 있다.
우리팀은 기본적으로 확장가능한 소프트웨어 작성하기 위한 방법으로 가이드라인과 apis를 제공하며 Shopify에 나머지 개발자들은 필수적으로 고객들에게 서비스를 만들어 준다.
우리팀의 모토는 `개발자에게 scale을 보이지 않게 하는 것이다.`

## Engineering at Shopify

2015년 이전 Operations and Performance team이 있었다. 이때 우리는 팀을 합쳐서 production engineering 부서를 만들기로 결정했다. 이 부서는 나머지 product 개발팀들의 코드 실행을 가능하게 하는 공통 인프라스트럭처를 유지하고 만들기 위한 책임을 가진다.

Production Engineering 그리고 모든 product 개발팀 둘다 end user applications에서 진행중인 작업에 대한 책임감을 가진다. 모든 기술적인 역할은 모니터링과 사고 대응을 공유하고 문제가 발생할 경우 서비스 복원에 필요한 스킬셋을 제공하기 위해 측면에서 에스컬레이션 한다.
<br />

## Initial architecture and stack

2004년도 shopify의 ceo이자 설립자인 Tobi Lütke는 스노우보딩 상품들을 위한 이커머스 샵을 만들고 있었다. 기존 시장의 이커머스 프로덕트에 만족하지 못한 Tobi는 ruby on rails를 이용하여 자신만의 SaaS platform을 만드는 것을 결정하였다.

**ruby on rails란?**

- ruby on rails : ruby를 언어로 작성된 웹 프레임워크. RoR이라고 불림. 풀 스택 프레임워크. Python Django, PHP의 Laravel에 영향을 끼침. node.js에게 왕자 자리를 내어줌.
- 장점 : 생산성, MVC, ORM(active record), sql X, scaffold
- 단점 : python보다 느림, 부팅 속도 up, 동적타입

```bash
# 한줄로 crud생성가능한 scaffold기능이 유명
rails g scaffold post title content:string
```

![image.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FSjonI%2Fbtqzr70fOHb%2FAAAAAAAAAAAAAAAAAAAAAEmAOTrMlbp2BJoiLGIuy7NqKI-AaQye96CoyQbvBcgq%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1751295599%26allow_ip%3D%26allow_referer%3D%26signature%3DyRm68Y5fYWMiciHgLwUG7kSjDCU%253D)
[출처](https://kbs4674.tistory.com/21)

이 당시에 Rails는 아직 1.0이 아니였고 하나의 zip 압축하여 이메일로 전달되는 the only version의 프레임워크 였다. Tobi는 Rail를 만든 David Heinemeier Hansson(DHH)에 조인하였고 Shopify를 만드는 동안 RoR에 기여를 시작했다.

Shopify는 현재 전세계에서 가장 크고 오래된 rails apps이다. 지난 10년동안 상당하게 성숙했지만, 재작성하지 않았고 여전히 오리지널 코드베이스를 사용한다. Tobi의 오리지널 커밋 전부 버전관리 히스토리에 있다.

Rails로의 배팅은 shopify에서 우리가 생각하는 방법을 매우 크게 변화시켰고 가능한 빠르게 product를 딜리버리 할수 있게 하였다. 프레임워크의 특정 부분들은 때로는 확장을 어렵게 하지만 (e.g. ActiveRecord 콜백과 code organization) 우리의 많은 구성원들은 Rails가 Shopify를 차고 스타트업에서 상장회사로 도약하게 해주었다는 Tobi의 의견에 동의하고 있다.

Shopify코어 앱은 Rails 모놀리스로 유지하지만 조직 전체에 수백개의 다른 rails 앱들도 있다. \`마이크로서비스\`가 아니라 도메인 특화 앱이다. 배송(다양한 배송업체들과 talk), Identify(Shopify의 모든 스토어는 SSO) 그리고 앱스토어 등등. 백여개의 앱을 관리하고 보안 업데이트를 통해 최신 상태를 유지하는 것은 어렵기에 모든 프로덕션 서비스들을 추척하고 개발자들에게 중요한것들을 놓치지 않도록 도와주는 내부 App인 ServicesDB를 개발했다.

![image](https://img.stackshare.io/featured_posts/shopify/shopify-servicesdb.jpg)

ServiceDB는 각각의 앱(ownership, uptime, logs, on-call rotation, exception reporting, and gem security updates)에 대한 체크리스트를 관리한다. 만약 하나라도 문제가 있으면 ServicesDB는 github issue를 열고 앱 소유자에게 주소를 요청한다. ServicesDB는 또한 인프라를 쉽게 쿼리할수 있고 다음과 같은 질문에 답을 받알수 있다. "Rails 4.2앱이 몇개야? gem x의 oudated version이 몇개? 이 소비스를 호출하는 앱이 뭐야?"
<br/>

## Our current stack

흔한 rails스택으로 아주 초기부터 관계형 데이터베이스 mysql, memcached for k/v storage, redis for queues and background jobs으로 운영하고 있다.

![image](https://img.stackshare.io/featured_posts/shopify/shopify-rails-stack.png)

2014년 더 좋은 하드웨어를 구매하여도 single mysql instance에서 우리의 모든 데이터를 저장하는것이 불가능하게 되었다. 우리는 sharding을 통해 shopify 전부를 수십개의 database partitions들로 분리하는 것을 결정하였다.

Shopify 상인(상점)들은 서로 isolated 상태였고 merchants의 서브셋을 싱글 샤드에 넣을 수 있었기 때문에 샤딩은 우리에게 나이스하였다. 만약 우리의 사업이 고객들 간 데이터를 공유하고 있었다면 힘들었을 것이다.

샤딩 프로젝트는 데이터베이스의 용량에 대한 약간의 시간을 벌어다 주었지만  곧 우리 인프라스트럭처에서 거대한 단일장애점(spof)이 있다는 것을 알게되었다. 모든 샤드는 여전히 단일 redis였다. 어느 시점에 redis 장애는 Shopify전체를 다운시켰다. 나중에  "Redismageddon"이라고 부르는 중대한 혼란이 일어났다. 이것은 우리에게 shopify전체가 공유하는 리소스는 피해야 한다는 중요한 교훈을 가르쳐 주었다.

수년 후 우리는 shards에서 "pods"개념으로 이동하였다. 하나의 pod는 mysql, redis, memcached와 같은 자신의 데이터 스토어를 가진 shopfy의 완전히 고립된 인스턴스이다. 하나의 pod는 모든 리전에서 생성할수 있다. 이런 접근은 글로벌 중단을 제거하는데 도움을 준다. 오늘날 우리는 100개가 넘는 pod을 가지고 있으며 pod 아키텍처로 이동 후 우리는 shopify전체에 영향을 미치는 중대한 장애가 발생하지 않았다. 오늘날 중단은 하나의 pod또는 region에서만 영향을 미친다.

![image](https://img.stackshare.io/featured_posts/shopify/shopify-pods-architecture.png)

수백개의 샤드와 팟으로 늘어나면서 이런 배포들을 지휘(orchestrate)하기 위한 솔루션이 필요하다는 것이 명확해지게 되었다. 오늘날 우리는 새로운 shopify 팟을 위한 리소스들을 쉽게 bootstrap하기 위해 docker, k8s, and GKE 사용한다. 로드밸런서 레벨에서 우리는 스크립트로 작성이 가능한 nginx, lua and OpenResty를 활용한다.

Shopify Admin의 클라이언트 사이드 스택은 긴 여정이였다. html템플릿, jQuery와 prototype.js로 시작했다. 2013년 우리는 in-house spa인 Batman.js로 이전하였다. 그런 다음 이 방식을 재평가하여 statically한 rendered HTML 과 바닐라 자바스크립트로 되돌아 갔다. 프론트엔드 생태계가 성숙하였고 우리의 접근을 다시 생각할 시간이 왔다고 느꼈다. 작년(역자주 : 이글은 2018년 8월에 작성) 우리는 shopify admin을 react와 typescript로 전환하는 작업을 시작하였다.

jquery와  batman 시대 이후로 많은것이 바뀌었다. 자바스크립트 실행은 훨씬 빨라졌다. 우리는 서버에서 앱을 쉽게 랜더링 할수 있고 클라이언트의 작업을 줄이 수 있으며 개발자를 위한 리소스와 툴링이 batman보다 react와 함께하여 상당히 좋아졌다.

또 다른 매우 현저한 차이점은 비지니스 로직이 클라이언트로 유출되지 않도록 보장하는 훨씬 더 나은 솔루션이 있다는 점이다. (GraphQL) Admin은 또다른 GraphQL 클라이언트가 되고 모바일앱에서도 미리 설정된 동일한 패턴을 따른다. 클라이언트 간 공유되어야하는 모든것들에 대해 서버에서 데이터 영속성과 의존성을 두지 않으며 view(화면)를 위한 리소스들을 매우 호율적으로 가져(fetch)온다.
<br />

## How we build, test, and deploy

Shopfy monolith는 약 10만개 유닛테스트를 가지고 있다. 무거운 ORM 호출이 많기 때문에 빠르지 않다. 빠른 shipping 파이프라인을 유지하기 위해 CI 인프라스트럭처에 엄청난 투자를 하였다.

우리는 CI 플랫폼으로  BuildKite를 사용한다. BuildKite가 유니크한 점은 BuildKite가 빌드를 오케스트레이트하고 UI를 제공하는 하면서 당신만의 하드웨어에서 우리만의 테스트 실행을 할수 있게 한다는 것이다.

![image](https://img.stackshare.io/featured_posts/shopify/shopify-buildkite-2-min.png)

우리의 모놀리스 빌드는 100k 테스트를 모두 수행하기 위해 15-20분이 소요되며 수백개의 병렬 ci 워커를 참여시킨다. 병렬 테스트 워커들은 계속 shipping을 가능케 한다. 이렇게 하지 않고 단일 빌드를 수행하면 수일이 소요 될 것이다. 수백명의 개발자가 매일 신규 피처와 개선사항들을 shipping하고 있고 빠른 CI 파이프라인을 유지하는 것이 중요하다.

빌드가 green이면 프로덕션에 변경사항들을 배포할 시간이다. 우리는 staging(역자주 : 우리로 따지면 Beta서버) 또는 canary배포를 수행하지 않는다. 대신 잘못될 경우 feature flags와 빠른 롤백에 의존한다.

![image](https://img.stackshare.io/featured_posts/shopify/shopify-shipit-engine.png)

우리의 배포툴인 Shipit은 shopify에서 지속적인 배포의 중심이다. Shipit은 프로젝트에 제공하는 배포 스크립트의 progress를 추적 및 실행하는 오케스트레이터이다. 즉시 이용가능한 Rubygems, Pip, Heroku, Capistrano 으로 배포할수 있다. 레거시 프로젝트를 위해 주로 k8s 배포 아니면 Capistrano이다.

<br />
<br />
![image](https://img.stackshare.io/featured_posts/shopify/shopify-shipit-slack.jpg)
코드가 배포될때 Shipit slack notification이 전송된다.

우리는 약간 수정한 github flow를 사용한다. 브랜치에서 피처 개발을 하고 production에서는 마스터 브랜치가 the source of truth가 된다. pr이 준비되면 shipit에 merge queue에 추가한다. merge queue의 아이디어는  마스터 브랜치에 머지되는 코드의 속도를 조절하는 것이다. busy hours에는 pr 머징을 하려는 개발자들이 많지만 동시에 많은 변경 사항을 시스템에 배포하기를 우리는 원치 않는다. Merge Quque는 한번에 5-10개 커밋들로 배포를 제한하기에 배포후 예상치 못한 행동을 발견할 경우 쉽게 이슈들을 식별 & 롤백 할수 있다.

브라우저 익스텐션을 사용하여 merge queue를 github에서 merge버튼으로 나이스하게 플레이한다.
![image](https://img.stackshare.io/featured_posts/shopify/shopify-github.png)

Shipit과 k8s--deploy둘다 오픈소스이고 우리의 flow를 채택한 회사들로부터 몇몇 성공 스토리를 들었다. (역자주 : 깨알자랑)
<br/>

## Next Challenges

Shopify의 모든 시스템은 확장을 염두하여 설계해야 한다. 동시에 클래식한 rails app에서 작업하고 있다는 느낌도 든다. 이것에 쏟은 엔지니어링의 노력의 양은 엄청났다. db 마이그레이션을 작업하는 개발자에게는 다른 rails app처럼 보일지 모르지만 이 후드(?)에서 제로 다운타임으로 100개 이상의데이터베이스 샤드에 비동기적으로 마이그레이션이 적용된다. 이 스토리는 ci, tests에서 배포까지 우리 인프라스트럭처의 다른 측면과 유사하다.

Production Engineering에서는 인프라를 k8s로 마이그레이션하기 위해 많은 노력을 기울였다. 클라우드 환경을 위한 준비가 되어있지 않아서 일부 어프로치와 설계 결정을 평가해야 했다. 동시에 k8s로의 많은 투자들은 이미 성과를 거두었다. 이전 Chef cookbooks를 작성하기 위해 며칠이 걸렸던것이 현재는 k8s yaml 의 몇개의 change의 문제일 뿐이다. 나는 k8s 재단이 성숙해지고 우리에게 더 많은 확장 가능성을 열어주기를 기대한다.

Semian과 Toxiproxy와 같은 툴과 함께 높은 안정성과 회복력을 향한 모놀리스를 만드는 위대한 일을 해왔다. 동시에 우리는 회사에서 운영중인 100개의 다른 production 서비스들을 approach하고 있다. - 대부분 rails를 사용한다. ServicesDB를 활용하여 우리는 이 모든것이 모놀리스와 동일한 패턴을 사용한다는 것을 확인할 수 있있고 10년동안 확장가능한 rails apps을 운영하면서 얻은 교훈을 전파하고 있다.

## 적극 채용중

이런 기술스택을 들어본적 있나? shopify는 채용 중이다. 모두를 위한 더 나은 커머스를 만들수 있게 우릴 도와줘. 또는 production engineering에 합류하여 우리 Shopify에서 세상 어떤곳보다 더 좋은 커머스를 만드는 기술스텍을 지속적으로 진화할수 있게 도와줘.

![image.png](/img/shopify.png)

[Shopify stackshare](https://stackshare.io/shopify/shopify)
<br />

## 요약

- 확장을 위해 샤딩(merchants기준 수평 분할)을 하였다.
  - 고도몰5 비슷하다.
  - 샵바이는 도메인단위로 db를 분리할수 있으며 수직 분할이 가능한 구조이다.
- spof를 줄이고 장애 전파 차단(isolatation)을 위해 pod으로 구성 하였다.
  - 고5는 application의 튜닝으로 인하여 app과 db의 버전이 수백개나 마찬가지. pod구성이 불가능.
  - 공통으로 사용하는 redis cluster, kafka broker, 우편번호 api등은 어떻게 관리하고 운영할것인가에 대한 고민이 필요하다.
- FE는 바닐라 -> 자체 SPA -> react + typescript으로 변화하였다.
- 수백대의 pod을 개발&운영 하기 위하여 container ochestration과 본인들 fit에 맞는 적절한 ci/cd를 구축하였다.
- 우리는 모놀리스다!

기사 : [https://n.news.naver.com/article/037/0000029467](https://n.news.naver.com/article/037/0000029467)
참고 : [https://blog.naver.com/kimmw90/222496121659](https://blog.naver.com/kimmw90/222496121659)
