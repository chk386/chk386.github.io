---
slug: notebook
title: Notebook 둘러보기
authors: [haekyu]
tags: [html]
---

# Jupyter Notebook

## 주피터 노트북이란

주피터 노트북은 웹 기반의 대화형 개발 환경(IDE)으로, 코드 실행, 텍스트 작성, 시각화 등을 하나의 문서에서 수행할 수 있는 오픈소스 도구

### 주요 특징

- 코드와 결과물을 실시간으로 확인 가능
- 마크다운을 통한 문서화 지원
- 40개 이상의 프로그래밍 언어 지원이라 하지만 거의 `파이썬`
- 데이터 시각화, 인공지능 라이브러리: numpy, matplotlib, torch등

### 주피터 노트북 주요 사용자층

1. ML 엔지니어/연구원 머신러닝/딥러닝 모델 개발 하이퍼파라미터 튜닝 모델 학습 과정 시각화 실험 결과 비교 및 문서화 PyTorch, TensorFlow 등 ML 프레임워크 활용
2. 데이터 사이언티스트 데이터 전처리 및 탐색적 데이터 분석(EDA) 데이터 시각화 통계 분석 가설 검증
3. 연구원/학계 연구 결과 문서화 실험 데이터 분석 논문 작성을 위한 그래프/차트 생성 재현 가능한 연구 환경 구축
4. 교육자 프로그래밍 교육 대화형 학습 자료 제작 ML/DL 실습 자료 제작
5. 엔지니어 프로토타입 개발 코드 테스트 및 디버깅 API 테스트

**ML 분야에서 주피터 노트북이 선호되는 이유** : 코드 실행 결과를 즉시 확인 가능 실험 과정과 결과를 체계적으로 문서화 시각화 도구를 통한 모델 성능 분석 용이 재현 가능한 실험 환경 제공 GitHub에서의 코드 공유 및 협업 편리

## 설치

### anaconda

데이터 과학 및 머신러닝을 위한 파이썬 배포판으로, 많은 패키지들이 미리 설치되어 있는 통합 개발 환경

#### 주요특징

- 1,500+ 오픈소스 패키지 포함
- 패키지 및 환경 관리 용이
- 가상환경을 통한 프로젝트별 독립적인 개발 환경 구축
- indows, macOS, Linux 지원 **poetry와 비슷**

```bash
# brew 설치
brew install --cask anaconda

# 버전확인
conda --version

# 가상환경 생성
conda create -n notebook python=3.11.0

# 활성화
conda activate notebook

# 비활성화
conda deactive notebook

# jupyter notebook 설치
pip install jupyterlab

# 주피터 노트북 실행
jupyter lab
```

# 1. Anaconda 설치

# 2. 주피터 노트북 실행

jupyter notebook
