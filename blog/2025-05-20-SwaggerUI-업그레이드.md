---
title: Swagger UI 교체 (Docusaurus OpenAPI)
hide_title: false
hide_table_of_contents: false
sidebar_label: Docusaurus OpenAPI 문서화
sidebar_position: 1
keywords:
  - docs
  - OpenAPI
  - Swagger
  - Docusaurus
authors: [haekyu]
tags: [openapi, swagger, docs]
image: /img/my_picture.jpg
slug: /openapi
---

# Docusaurus OpenAPI 문서화

**Swagger UI에 대한 내,외부 불만**

- 에이전시 개발사, 인하우스 개발사에서 Swagger UI로 제공중인 문서화 기능에 불만이 많음
- 현재 외부로 제공중인 api 엔드포인트는 Server API와 Shop API가 있으며 API의 갯수는 약 300개 이상임
- 마이크로 서버(도메인) 단위로 OAS yaml파일을 생성하며 특정 API를 확인하려면 어떤 도메인에 속해 있는지 사용자가 인지 하고 있어야 함 -> 매우 불편
- 특히 검색이 안됨 -> 강성 클레임

## Web UI

### **AS-IS** : Swagger UI

[Shopby API Documentation](https://docs.shopby.co.kr/?url.primaryName=product/#/Product/get-products-product)

![shopby-docs](/img/wiki/swagger-ui.png)

### **TO-BE** : Docusaurus Openapi

[https://docusaurus-openapi.tryingpan.dev/](https://docusaurus-openapi.tryingpan.dev/)

![docusaurus-openapi](/img/wiki/docu-api.png)

## Docusaurus OpenAPI vs Swagger UI - 주요 장점

### 통합 문서화

- **API 문서와 가이드, 튜토리얼을 한 곳에서 관리**
- Swagger UI는 API 스펙만 보여주지만, Docusaurus는 사용법, 예제, 개념 설명 등을 함께 제공
- 개발자가 API 이해부터 실제 구현까지 원스톱으로 학습 가능

### 더 나은 사용자 경험

- **검색 기능, 다크모드, 반응형 디자인** 등 현대적인 웹 경험
- 사이드바 네비게이션으로 API 탐색이 더 직관적
- Swagger UI보다 **로딩 속도가 빠르고** 인터페이스가 깔끔

### 커스터마이징과 확장성

- **브랜딩, 테마, 레이아웃을 자유롭게 커스터마이징**
- React 컴포넌트로 대화형 예제나 코드 스니펫 추가 가능
- 다국어 지원, 버전 관리, 블로그 등 추가 기능 통합

---

### 요약

> **Swagger UI**는 API 스펙 확인용이라면,  
> **Docusaurus OpenAPI**는 완전한 개발자 포털을 구축하는 도구이다.

## 설치 방법

1. docusaurus 설치

```typescript
npx create-docusaurus@3.7.0 my-website --package-manager yarn
// Git repository 선택 후 아래 url 붙여넣기
// https://github.com/PaloAltoNetworks/docusaurus-template-openapi-docs.git
// copy 선택
```

2. 플러그인 설치 후 시작

```bash
yarn add docusaurus-plugin-openapi-docs
yarn add docusaurus-theme-openapi-docs
yarn start # http://localhost:3000 확인
```

3. `docusaurus.config.ts` plugin 수정

```json
plugins: [
        [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          productShop: {
            specPath: "https://docs.shopby.co.kr/spec/product-shop-public.yml ",
            outputDir: "docs/product/shop",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
         }
        } satisfies Plugin.PluginOptions,
      },
    ],
```

**specPath**: open api 빌드 후 추출된 yaml파일을 docusaurus 형식에 맞게 변환시킬 yml path <br/>
**outputDir**: OAS yaml 파일을 해당 위치로 변환하여 저장

4. open api build후 나오는 yml을 위의 specPath에 복사

5. docusaurus  api 문서 생성

```bash
yarn docusaurus gen-api-docs all
```

여기 까지 하면 위의 outputDir 경로에 아래와 같이 생성된다.
![asd](/img/wiki/docs-api.png)

6. Sidebar 노출

- 왼쪽 목록에 노출시키려면 sidebar.ts를 수정

```typescript
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    { type: "doc", id: "intro" },
    { type: "autogenerated", dirName: "tutorial-basics" },
    { type: "autogenerated", dirName: "tutorial-extras" },
  ],
  openApiSidebar: [
    {
      type: "category",
      label: "Product Shop",
      link: {
        type: "generated-index",
        title: "Product Shop API",
        description: "설명",
        slug: "/category/product-api",
      },
      items: require("./docs/product/shop/sidebar.ts"),
    },
  ],
};

export default sidebars;
```

**openApiSidebar 배열에 API 문서 추가**

## 상단메뉴바

`docusaurus.config.ts` 에 nav 수정

```typescript
  navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
        { to: "http://localhost:3000", label: "Shop 바로가기", position: "left" },
          { to: "https://server-docs.shopby.co.kr/", label: "Server 바로가기", position: "left" },
          {
            label: "Product API",
            position: "left",
            to: "/docs/category/product-api",
          },
         {
            label: "Order API",
            position: "left",
            to: "/docs/category/order-api",
          },
        {
            label: "Admin API",
            position: "left",
            to: "/docs/category/admin-api",
          },
        ],
      },
```

## CLI

```
yarn docusaurus clean-api-docs all
// mdx파일 clean

yarn docusaurus gen-api-docs all
// mdx파일 생성

yarn docusaurus gen-api-docs <specKey>
// 특정 yml만 생성

yarn build # html로 publish
yarn serve # 웹 서빙
```

## 주의사항

> open api(yml) 파일 안에 `<br >`와 같이 태그가 안 닫힌 태그가 있다면 mdx파일 생성시 오류 발생함
> <br/>로 모두 치환해야함

## 검색 플러그인

![search](/img/wiki/docu-search1.png)
![search](/img/wiki/docu-search2.png)

docusaurus-search-local 플러그인을 적용하여 yarn build시 검색 인덱싱을 수행한다.

[github url](https://github.com/easyops-cn/docusaurus-search-local)

```bash
npm install --save @easyops-cn/docusaurus-search-local
```

**docusaurus.config.ts에 아래와 같이 수정**

```typescript
  plugins: [
    // 검색 플러그인 추가
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en", "ko"], // 한국어 지원
        docsRouteBasePath: ["/docs"], // 검색 인덱싱 경로
        indexDocs: true,
        indexPages: true,
        indexBlog: true,
        blogRouteBasePath: "/blog",
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
```

```bash
yarn build # 빌드 & 검색 인덱싱
yarn serve # 웹 서빙
```

## 특이사항

- 테스트 코드 변경시마다 yml파일을 바꿔치기 해주어야 하는건가?
  - => specPath를 [https://docs.shopby.co.kr/spec/admin-shop-public.yml](https://docs.shopby.co.kr/spec/admin-shop-public.yml) 와 같이 하면 해당 yml파일로 빌드 가능
- MDX라는 markdown + react 문법을 사용하며 리엑트에 대한 이해가 약간 필요해 보인다.

## 왼쪽 메뉴 한글로 변경하기

![sidebar](/img/wiki/docu-sidebar.png)

### label 노출하기

docusaurus-plugin-openapi-docs 에서 tag에 x-displayName이 존재하면 해당 값으로 쓰고 아니면 tag.name 을 사용한다.
[원본소스 바로가기](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/blob/main/packages/docusaurus-plugin-openapi-docs/src/sidebars/index.ts)

```typescript
return {
  type: "category" as const,
  label: tagObject?.["x-displayName"] ?? tag,
  link: linkConfig,
  collapsible: sidebarCollapsible,
  collapsed: sidebarCollapsed,
  items: [...taggedSchemaItems, ...taggedApiItems].map((item) =>
    createDocItemFn(item, createDocItemFnContext)
  ),
};
```

test/resources/tags.yml에 아래와 같이 세팅되어 있고, build.gradle에서 tagDescriptionsPropertiesFile = "src/test/resources/tags.yml" 와 같이 세팅하게 되면  openapi 로 생성되는 yml에 tag가 name, desciption 항목이 생성된다.
![tag](/img/wiki/docu-tag.png)

여기서 tags에 x-displayName을 세팅해줘야한다.
build.gradle에 openapi 테스크가 진행될 때 x-displayName을 세팅해서 넣어줄 수 있도록 한다.

```kotlin
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory

// tagDescriptionsPropertiesFile = "src/test/resources/tags.yml" => 주석


val addDisplayNamesToOpenApi by tasks.registering {
    doLast {
        val tagsFile = project.file("src/test/resources/tags.yml")
        val yamlText = tagsFile.readText()

        val mapper = ObjectMapper(YAMLFactory())
        val tagsMap: Map<String, String> = mapper.readValue(yamlText, object : TypeReference<Map<String, String>>() {})

        val openApiFile = file("build/api-spec/product-shop-public.yml")
        if (!openApiFile.exists()) {
            throw GradleException("OpenAPI 파일이 없습니다: $openApiFile")
        }

        val rootNode = mapper.readTree(openApiFile) as com.fasterxml.jackson.databind.node.ObjectNode

        // tags 노드가 없으면 새로 만들기
        val tagsNode = rootNode.withArray("tags")

        // 기존 태그가 있으면 초기화 (선택 사항)
        tagsNode.removeAll()

        // tags.yml 내용으로 tags 배열 채우기
        tagsMap.forEach { (name, description) ->
            val tagNode = mapper.createObjectNode()
            tagNode.put("name", name)
            tagNode.put("description", description)
            tagNode.put("x-displayName", "$name-$description")
            tagsNode.add(tagNode)
        }

        // 수정된 내용을 다시 파일에 저장
        mapper.writeValue(openApiFile, rootNode)

        println("✅ tags.yml 기반으로 tags 배열을 OpenAPI 파일에 새로 추가했습니다: $openApiFile")
    }
}

afterEvaluate {
    tasks.named("openapi3") {
        finalizedBy(addDisplayNamesToOpenApi)
    }
}
```

### x-displayName 추가

![x-display](/img/wiki/docu-tag-x-dis.png)

## Swagger UI - Authorize 대체

**기존 docs에 Authorize 버튼이 있고, 입력하면 header에 `Authorization, systemKey`를 넣어주는 기능을 구현해야함**

![auth](/img/wiki/docu-auth.png)

### swagger 플러그인 설치

```bash
npm install swagger-ui-react swagger-ui
```

### React 18 다운그레이드 (swagger 플러그인 의존성!)

```typescript
// package.json
"react": "^18.2.0",
"react-dom": "^18.2.0"
```

### 재설치

```bash
rm -rf node_modules package-lock.json
npm install
```

### openapi.yaml 파일 추가

**/static/openapi.yaml 파일에 아래 내용 추가**

```yaml
openapi: 3.0.1
info:
  title: Example API
  version: "1.0.0"

paths:
  /example:
    get:
      summary: Example endpoint
      security:
        - BearerAuth: []
        - SystemKeyAuth: []
      responses:
        "200":
          description: Success

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    SystemKeyAuth:
      type: apiKey
      in: header
      name: systemKey

security:
  - BearerAuth: []
  - SystemKeyAuth: []
```

## 결과물

[링크](https://chk386.github.io/docs/product/shop/get-products-product)
