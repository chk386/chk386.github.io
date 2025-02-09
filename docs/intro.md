---
sidebar_position: 1
---

# 메모
AI활용, AI서비스 개발과 관련된 컨텐츠를 이해 하기 위한  기초적인 지식이 필요하다고 느꼇음
-  https://news.hada.io/topic?id=17398


# 파이썬 생태계 학습 로드맵
## 파이썬
- 파이썬 프로젝트 인큐베이팅 & 기본 셋팅
    - poetry
    - black
    - pylint
    - pytest
    - vscode
```bash
# python, poetry 설치 완료 상태에서
poetry new fastapi-init
poetry add fastapi uvicorn
poetry add --dev pytest pylint black
```

```toml
# pyproject.toml 추가
[tool.pylint.MASTER]
init-hook = 'import sys; sys.path.append(".")'

[tool.pylint."MESSAGES CONTROL"]
disable = "missing-docstring, too-few-public-methods"

[tool.black]
line-length = 88 # 기본값
target-version = ['py38'] # 파이썬 버전 지정
include = '\.pyi?$'
extend-exclude = '''
# 제외할 디렉토리나 파일 지정
/(
    \.eggs
  | \.git
  | \.venv
  | build
  | dist
)/
'''
```

Command Palette(cmd+shift+p) -> Preferences: Open work
space Settings(JSON) 클릭, .vscode/settings.json 오픈 후 아래 json 붙여 넣기
```json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.linting.pylintArgs": [
        "--rcfile=pyproject.toml",
    ],
    "python.pythonPath": ".venv/bin/python",
    "editor.formatOnSave": true,
    "python.formatting.provider": "black",
    "[python]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "ms-python.black-formatter"
    }
}
```

- fastapi 학습
    - sqlite 연동 crud
    - jinja2 서버사이드 템플릿
    - testcase 작성
- orm
    - sqlalchemy 기반 crud
- requests
    - api호출
- crawling & scrapping
    - 셀레니움
    - requests
    - 데이터 적재 -> excel, cvs등
- 비동기/병렬 실행
    - asyncio
    - API등을 동시 2개 실행 적재
- qtpy
    - qt designer 이용 하여 계산기 샘플
    - Qt-Material 테마 사용
- 실행 파일 빌드    
    - pyinstaller (윈도우)
    - py2app (macos)


