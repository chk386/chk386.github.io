---
title: Spring Observability 구현
draft: true
sidebar_label: Spring Observability 구현
sidebar_position: 1
keywords:
  - Spring
  - Kotlin
  - Opentelemetry
  - Loki
  - Tempo
  - Prometheus
  - Grafana
  - Micrometer
  - Actuator
authors: [haekyu]
tags: [python, crawler, gui]
image: /img/my_picture.jpg
slug: /observability
---

MSA 환경에서 가시성 확보를 위한 Application Log, Metrics, Distributed Tracing을 유명 오픈소스를 이용하여 Grafana로 시각화해보자

<!-- truncate -->

## 아키텍처

```
               ┌──────────┐                      ┌─────┐
               │          │                      │Kafka│
               │  Client  │                      └─────┘
               │          │                      ┌─────┐
               └─────┬────┘                      │Redis│
                     │                           └─────┘
                     │                           ┌───────────┐
                     │                           │PostgreSQL │
                     │                           └───────────┘
          ┌──────────▼───────────┐         ┌───────────────────────┐
          │       API G/W        │         │    Product Server     │
          │                      ┼─────────►                       │
          │  OpenTelemetry Agent │         │  OpenTelemetry Agent  │
          └──────────┬───────────┘         └────────────┬──────────┘
                     │                                  │
                     │                                  │
                     │                                  │
                     │                                  │
                     │     ┌────────────────────────┐   │
                     │     │                        │   │
                     └─────►OpenTelemetry Collector ◄───┘
                           │                        │
                           └───────────┬────────────┘
                                       │
                                       │
                                       │
          ┌────────────────────────────┼─────────────────────────────┐
          │                            │                             │
          │                            │                             │
┌─────────▼────────────┐     ┌─────────▼────────────┐     ┌──────────▼────────┐
│        Tempo         │     │        Loki          │     │     Prometheus    │
│                      │     │                      │     │                   │
│  Distributed Tracing │     │   Application Logs   │     │  Metric, Actuator │
└──────────▲───────────┘     └──────────▲───────────┘     └──────────▲────────┘
           │                            │                            │
           │                            │                            │
           │                            │                            │
           └────────────────────────────┼────────────────────────────┘
                                        │
                                        │
                                        │
                              ┌─────────┴─────────┐
                              │     Grafana       │
                              │                   │
                              │   DashBoard       │
                              └─────────▲─────────┘
                                        │
                                        │
                                        │
                                ┌───────────────┐
                                │               │
                                │  Developer    │
                                │               │
                                └───────────────┘
```


## 구현순서
1. SpringBoot Initailzr
1. docker-compose 작성
1. Opentelemetry Agent 실행
1. OTS 콜렉터
1. 어플리 케이션 코드 구현
    1. GW Router작성
    1. Product 서버 구현
        1. 상품 조회 -> 카프카 이벤트 발행 -> 컨슈머 : 조회수 증가
        1. 상품 등록 -> DB 등록
1. Tempo 수집
1. Loki 수집
1. Prometheus 수집
1. grafana promQL작성
    1. 시각화 캡쳐