---
title: 커머스 플랫폼 개발 여정
hide_title: false
hide_table_of_contents: false
sidebar_label: 그림으로 살펴보는 커머스 플랫폼 개발 여정
sidebar_position: 1
keywords:
  - architecture
  - msa
  - monolith
  - diagram
  - deploy
  - k8s
authors: [haekyu]
tags: [architecture]
image: /img/my_picture.jpg
slug: /arch
---

2014년부터 개발해온 커머스 플랫폼의 변화와 여정에 대해서 기록해보았다.
자료가 더 많지만 민감한 내용도 있을 수 있기에 매뉴얼, 기술 컨퍼런스, 유튜브 등에 공개된 내용만 적어본다.

<!-- truncate -->

## NCP 아키텍처

2016년 Headless, API 기반의 커머스 플랫폼을 만들 때 그렸던 아키텍처다.
![NCP아키텍처](/img/NHN/ncp1.png)

- REST API는 StoreFront를 서빙하기 위한 엔드포인트 서버이고 Admin은 JSP로 구현했다
- Spring 4.x 버전대로 구축하였으며 초기에는 Java Configuration 방식으로 프로젝트를 구성하였으나 SpringBoot 1.X로 중간에 포팅했다
- 이 시기에 간단한 CRUD성 게시판 같은 기능들을 JPA와 QueryDSL을 도입하였다
- 모니터링 툴은 이때 혜성처럼 등장한 오픈소스인 Scouter를 적용하였으며 성능테스트 병목, 운영 모니터링에 큰 도움이 되었다
- 사내 인프라(VM) 장비에 셋팅하였으며 젠킨스 빌드 스크립트를 이용하여 jar로 빌드 후 TCD라는 사내 배포시스템으로 jar를 배포 서버로 복사하고 톰캣을 재구동하는 형태로 배포를 수행했다

## 페이코 쇼핑

**2018년 NHN 간편결제 서비스 PAYCO 앱내 제휴 쇼핑몰 상품과 이벤트 정보를 제공할 수 있는 채널 구축**
![PAYCO_SHOPPING](/img/NHN/ncp5.png)

- 주문 결제는 아웃링크로 빠지는 구조. 핵심 도메인은 전시상품, 제휴파트너
- 8천만 건의 제휴 상품 노출
- 1년 정도 개발 & 운영 후 거래액 미달에 따른 서비스 조기 종료
- 처음으로 MSA를 서비스에 도입
- 컨테이너 배포, 서비스 레지스트리, API Gateway, Kafka, Config Server, Spring Cloud 구축

## 새로운 기술스택 선정

MSA로 전환 시점에 동료들과 협의했던 기술스택이다.
![NCP아키텍처](/img/NHN/ncp2.png)

- 큰 변화는 Netflix OSS(나중에 Spring Cloud로 전환) 적용과 컨테이너 배포 & 운영이었다
- Kotlin의 경우 루키, 주니어 개발자 분들의 바텀업으로 채택하였다. 2-3달 만에 다들 금방 적응해서 kotlin way로 코드 결과물이 좋게 나왔다
- SonarQube는 기존부터 사용하고 있었으나 Kotlin 지원이 이때는 시원치 않았다
- 사내 모니터링 툴에서 벗어나서 최초로 프로메테우스를 도입하였다. Node Exporter를 이용하여 메트릭 정보를 Grafana로 처음 봤을 때 그 감동이란!
- 이 시점에 DevOps 파트를 신설하였다. 백엔드 엔지니어들밖에 없던 조직에서 지원자를 받아 2명으로 시작하였다. Nexus를 구축하여 컨테이너 빌드 & 이미지를 업로드하는 부분과 배포 대상 서버에 Ansible로 원격 배포하는 부분이 첫 작업물이었으며 생각보다 빠르게 CI/CD 프로세스를 잡아나갔다
- Ubuntu의 경우 CentOS의 라이센스 변화로 넣었으나 네트워크 문제, 미들웨어 설치 문제 등을 해결하지 못하여 Ubuntu는 사용하지 못했다

**아래는 일본/미국/중국 커머스 법인과 함께한 글로벌 워크샵**
![work](/img/NHN/work1-min.jpg)
![work](/img/NHN/work2-min.jpg)
![work](/img/NHN/work3-min.jpg)

## 무중단 이관

**API 단위 점진적 이관**
![NCP아키텍처](/img/NHN/ncp3.png)

- 앞단 nginx나 LB단에서 API URL path 단위로 경로를 바꾸거나 RestController단에서 인터널 콜(HTTP 통신)로 가자는 의견들이 나왔다
- 실제로는 빠르게 롤백 가능한 방법이 채택되었으며 앞단에 GSLB를 두고 경로 수정을 하였다

## NCP MSA 전환

**페이코 쇼핑에서 얻은 경험을 기반으로 본격적인 커머스 플랫폼의 SaaS 상품화 시작(2019년~)**

![Shopby](/img/NHN/ncp8.png)

- 페이코 쇼핑 프로젝트의 경험을 바탕으로 개별 마이크로 서버들의 분산 모니터링, 프로파일링, 메트릭, 로깅 등을 강화했다
- Server-Side Kotlin 도입 & Kotlin DSL 활용
- 리액티브 시스템: Spring WebFlux + Coroutine 도입
- 1,500개 API 점진적 전환
- 18명의 팀 동료와 1년 이상 진행

**간략한 서비스 아키텍처**
![Shopby](/img/NHN/ncp9.png)

## 상품 검색 엔진 도입

**사내 검색 플랫폼 운영 중단 소식에 급하게 ES로 구축**
![Shopby](/img/NHN/ncp-search2.png)

- 상품 전체 색인, 일배치
- 2021년 시점엔 상품 수가 라이브 상품이 30만 건 정도밖에 안 되었으나 25년 3천만 건 서빙 중

![Shopby](/img/NHN/ncp-search1.png)

- 부분 색인, 10초 단위 쿠버네티스 크론잡 실행

## 쿠버네티스 도입

**쿠버네티스 공부하면서 그려본 아키텍처**
![Shopby](/img/NHN/ncp12.png)

- 앞단에 GSLB를 두고 판교, 평촌 리전에 이중화 구성 계획
- 프로메테우스 인스턴스가 생각보다 장애가 많이 발생하여 HA 고려한 오픈소스 타노스 도입
- MySQL 5.7 MMM 구조에서 ProxySQL을 도입하여 sharding, MySQL 8.0 무중단 업그레이드 계획
- Istio 사이드카 패턴 도입과 분산 트레이싱으로 Jaeger 도입 계획

![Shopby](/img/NHN/ncp13.png)

- Tekton은 커뮤니티 성숙도와 DevOps 파트의 의견을 고려하여 ArgoCD 도입
- 컨테이너 배포를 Ansible에서 ArgoCD 전환
- 컨테이너 레지스트리를 Nexus에서 Harbor 전환

## 배포

**컨테이너 배포 프로세스**
![NCP아키텍처](/img/NHN/ncp4.png)

**쿠버네티스 배포 프로세스**
![Shopby](/img/NHN/ncp15.png)

- 개발자와 DevOps 엔지니어가 배포 프로세스 역할 정리
- Helm 차트를 git에 푸시하여 ArgoCD 배포 프로세스 구성

![Shopby](/img/NHN/ncp16.png)

- Fluentd를 활용한 EFK(Elasticsearch, Fluentd, Kibana) 애플리케이션 로깅 구축
- ES의 고비용 문제로 드랍, Loki로 대체

## k8s 무중단 이관

![Shopby](/img/NHN/gslb-k8s-mig.png)

- 쿠버네티스를 도입한 MSA 전체를 띄워서 GSLB로 트래픽을 조절해 가면서 점진적 무중단 배포 구현
- Jenkins에서 job으로 실행되는 Spring Batch와 Consumer를 제외한 나머지 API 전 영역 전환
- 점진적으로 Jenkins에서 쿠버네티스 크론잡으로 전환
