---
sidebar_position: 3
sidebar_class_name: pink
slug: /bem
---

이쁜 쇼핑몰 클론 작업을 하면서 css className를 어떻게 지으면 좋을지 고민이 많았습니다. 사내 친분이 있는 프론트엔드 개발자에게 조심스레 문의를 해보았고 BEM 관련 링크를 보내주셔서 학습 차원에서 기록해봅니다.

# BEM
`Block, Element, Modifier`
## 특징
- Easy : BEM을 사용하기 위해 단지 BEM 네이밍 컨벤션을 도입하면 된다.
- Modular : 독립적인 블럭과 css셀렉터는 너의 코드를 재사용 가능하고 모듈러하게 만든다.
- Flexible : BEM을 사용하면 방법론과 도구를 원하는 방식으로 재구성하고 구성할 수 있습니다.

## Why BEM?
- 목적 또는 기능을 전달
- 구성 요소의 구조를 전달
- 선택자 특이도(`selector's specificity`)를 낮은 수준으로 유지
```css title='CSS selector's specificity
*               /* a=0 b=0 c=0 -> specificity =   0 */
LI              /* a=0 b=0 c=1 -> specificity =   1 */
UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
#x34y           /* a=1 b=0 c=0 -> specificity = 100 */
#s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
```

## BEM 구성
- Block : 그 자체로 의미 있는 독립형 엔티티입니다.
> header, container, menu, checkbox, input
> > 재사용 가능한 기능적으로 독립적 페이지 컴포넌트를 의미
<br/>
- Element : 독립적인 의미가 없으며 의미론적으로 해당 블록에 연결된 블록의 일부입니다.
> menu item, list item, checkbox caption, header title
<br/>
- Modifier : 블록 또는 요소의 플래그입니다. 모양이나 동작을 변경하는 데 사용합니다.
> disabled, highlighted, checked, fixed, size big, color yellow

위 3가지 요소를 class name에 적용하면 아래와 같이 표현할 수 있다.
```css
.block__element--modifier {}

.div__btn--inactive {}
.div__btn--active {}
.div__btn--theme-dark {}
.div__btn--theme-light {}
.div__a {}
```

몇가지만 주의하면 될것 같다.
엘리먼트를 계층으로 생각하면 안된다. nested로 하지 말고 형제로 인식하자.
css nested형태로 작성하면 굉장히 가독성이 좋다.

@FIXME: 쇼핑몰 클론 BEM적용한거 링크 걸자


## 출처
[getbem.com](https://getbem.com/)

