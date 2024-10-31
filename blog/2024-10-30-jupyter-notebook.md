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

- 1,500+ 오픈소스 패키지 포함
- 패키지 및 환경 관리 용이
- 가상환경을 통한 프로젝트별 독립적인 개발 환경 구축

#### 가상환경 관리

- 가상환경(Virtual Environment) 생성 및 관리가 용이
- 프로젝트별로 다른 파이썬 버전과 패키지를 사용 가능
- 의존성 충돌 문제 해결에 도움

#### 주요 포함 도구

- Jupyter Notebook/Lab: 대화형 개발 환경
- Spyder: 파이썬 통합개발환경(IDE)
- NumPy, Pandas, Matplotlib 등 데이터 분석 라이브러리
- scikit-learn: 머신러닝 라이브러리

```bash
# brew 설치
brew install --cask anaconda

# 버전확인
conda --version

# 가상환경 생성
conda create -n notebook python=3.11.0

# zsh or bash profile 추가
conda init zsh (or bash)

# 활성화
conda activate notebook

# 비활성화
conda deactive

# 커널 조회 & 선택

# 주피터 노트북 실행
jupyter lab
```

## 1:1 문의 카테고리별 카운팅

```python
import mysql.connector
import plotly.graph_objects as go

# MySQL 연결
conn = mysql.connector.connect(
    host='10.104.17.79',
    database='cos_alpha',
    user='cos_alpha',
    password='zh0tmdkfvk!DB',
    port= '13306'
)

# 커서 생성
cursor = conn.cursor(dictionary=True)

# 쿼리 실행
cursor.execute("""
select cqc.category_name, count(1) as cnt
  from cos_qna a
 inner join cos_qna_category cqc on a.cos_qna_category_no = cqc.cos_qna_category_no
 group by cqc.category_name
""")

# 결과 가져오기
data = cursor.fetchall()

# 카테고리와 건수를 별도 리스트로 분리
categories = [item['category_name'] for item in data]
counts = [item['cnt'] for item in data]

# 바차트 생성
fig = go.Figure(go.Bar(
    x=counts,
    y=categories,
    orientation='h',
    marker=dict(
        color='rgb(55, 83, 109)',
        line=dict(color='rgb(8,48,107)', width=1.5)
    )
))

# 차트 레이아웃 설정
fig.update_layout(
    title='카테고리별 건수',
    title_x=0.5,  # 제목 중앙 정렬
    xaxis_title='건수',
    yaxis_title='카테고리',
    width=800,
    height=1500,
    font=dict(
        family="Noto Sans KR",  # 한글 폰트 설정
        size=12
    ),
    showlegend=False,
)


# 차트 표시
fig.show()


# 연결 종료
cursor.close()
conn.close()


```
