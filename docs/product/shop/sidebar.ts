import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "product/shop/product-shop",
    },
    {
      type: "category",
      label: "Brand-브랜드",
      items: [
        {
          type: "doc",
          id: "product/shop/get-display-brands",
          label: "브랜드 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-display-brand-extra-info",
          label: "브랜드 추가 정보 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/search-brands",
          label: "브랜드 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-display-brands-search-by-nos",
          label: "브랜드번호로 브랜드정보 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-brand-tree",
          label: "브랜드 트리 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-display-brands-brand-no",
          label: "브랜드 상세 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-brand-children",
          label: "자식 브랜드 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Product-상품",
      items: [
        {
          type: "doc",
          id: "product/shop/묶음-배송-상품-목록-조회",
          label: "묶음 배송 상품 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-product-extra-infos",
          label: "상품 번호 리스트로 추가 정보 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-favorite-keywords",
          label: "인기 검색어 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-group-management-code",
          label: "그룹관리코드 조회하기",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-products-options",
          label: "옵션 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-public-infos",
          label: "상품 공개용 기본정보 조회 API",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-regular-delivery",
          label: "변경 가능한 정기 결제 상품 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/post-restock",
          label: "재입고 알림 신청",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-products-search",
          label: "상품 검색(search engine)하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-search-by-nos",
          label: "상품번호 리스트로 상품 조회",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-shipping-infos",
          label: "상품번호를 통한 배송 정보 및 배송 불가 국가 조회 API",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-product",
          label: "상품 상세 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-best-review-search",
          label: "베스트 리뷰 상품 검색(search engine)하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-best-seller-search",
          label: "베스트 셀러 상품 검색(search engine)하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-search-regular-delivery",
          label: "상품 번호 리스트로 정기 결제 상품 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-product-keywords",
          label: "상품 번호 리스트로 검색어 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-search-summary",
          label: "상품 검색 결과 Summary 정보 조회(search engine)하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-product-no-display-categories",
          label: "상품번호에 해당하는 모든 전시카테고리 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-product-options",
          label: "옵션 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-product-purchase-permission",
          label: "상품번호로 상품우선구매권한 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-related-products",
          label: "관련 상품 정보 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-url-shortening",
          label: "상품 번호와 쇼핑몰 번호에 해당하는 단축URL 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-options-images",
          label: "상품에 해당하는 옵션 이미지 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-products-option-images",
          label: "옵션의 이미지 정보 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Free Gift-사은품",
      items: [
        {
          type: "doc",
          id: "product/shop/get-free-gift-condition-order-amount",
          label: "사은품 지급가능한 조건 조회하기 (주문금액기준)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-free-gift-condition",
          label: "사은품 지급가능한 조건 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Profile-프로필 (회원)",
      items: [
        {
          type: "doc",
          id: "product/shop/get-guest-recent-products",
          label: "비회원용 최근 본 상품 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-like-brands",
          label: "브랜드 좋아요 목록 전체 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-like-products",
          label: "회원이 좋아하는 상품목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/post-profile-like-products",
          label: "회원이 상품을 좋아한다고 추가/삭제하기",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-recent-products",
          label: "최근 본 상품 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/post-profile-recent-products",
          label: "최근 본 상품 등록하기",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/delete-profile-recent-products",
          label: "최근 본 상품 삭제하기",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "product/shop/post-profile-like-display-brands",
          label: "브랜드에 대한 좋아요 설정 및 해제하기",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-like-brands-count",
          label: "브랜드 좋아요 수 목록 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-like-brands-member",
          label: "회원이 좋아요한 브랜드 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "product/shop/post-profile-like-products-2",
          label: "상품에 대한 좋아요 설정 및 해제하기",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "product/shop/get-profile-like-products-count",
          label: "회원이 좋아하는 상품 수 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Additional Discount-추가할인",
      items: [
        {
          type: "doc",
          id: "product/shop/get-additional-discounts-by-product-no",
          label: "추가할인 정보 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Custom Property-상품 추가 항목",
      items: [
        {
          type: "doc",
          id: "product/shop/get-custom-property-by-mallno",
          label: "상품 항목 조회하기",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Configuration-설정",
      items: [
        {
          type: "doc",
          id: "product/shop/get-configuration-naver-shopping",
          label: "네이버 쇼핑 설정정보 조회",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
