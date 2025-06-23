import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "admin/shop/admin-shop",
    },
    {
      type: "category",
      label: "Mall",
      items: [
        {
          type: "doc",
          id: "admin/shop/get-malls",
          label: "몰 정보 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "admin/shop/get-malls-i-18-n",
          label: "현재 몰의 다국어, 환율 설정 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "admin/shop/get-malls-partners",
          label: "몰과 계약한 파트너 목록 조회하기",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "admin/shop/get-malls-ssl",
          label: "현재 도메인의 보안서버정보 조회하기",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
