// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "아윤이 아빠",
  tagline: "기술 블로그",
  url: "https://chk386.github.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "chk386", // Usually your GitHub org/user name.
  projectName: "chk386.github.io", // Usually your repo name.

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/chk386/chk386.github.io/tree/main/docs",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: {
          path: 'blog',
          // Simple use-case: string editUrl
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          // Advanced use-case: functional editUrl
          editUrl: ({locale, blogDirPath, blogPath, permalink}) =>
            `https://github.com/facebook/docusaurus/edit/main/website/${blogDirPath}/${blogPath}`,
          editLocalizedFiles: false,
          blogTitle: 'Blog title',
          blogDescription: 'Blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '전체 포스트',
          routeBasePath: 'blog',
          include: ['**/*.{md,mdx}'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],
          postsPerPage: 10,
          blogListComponent: '@theme/BlogListPage',
          blogPostComponent: '@theme/BlogPostPage',
          blogTagsListComponent: '@theme/BlogTagsListPage',
          blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
          // remarkPlugins: [require('./my-remark-plugin')],
          rehypePlugins: [],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          showReadingTime: true,
          feedOptions: {
            title: '',
            description: '',
            copyright: '',
            language: undefined,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig:
    {
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: "아윤이 아빠 놀이터",
        logo: {
          alt: "My Site Logo",
          src: "img/golf.png"
        },
        items: [
          {
            type: "doc",
            docId: "About",
            position: "left",
            label: "Wiki",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            label: "API 문서(테스트)",
            position: "left",
            to: "/docs/category/product-api",
          },
          {
            href: "https://github.com/chk386",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Wiki",
                to: "/docs/About",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "vim.kr",
                href: "https://vim.kr",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/chk386",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 아윤이사랑해, Inc. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: [
          "ruby",
          "csharp",
          "php",
          "java",
          "kotlin",
          "powershell",
          "json",
          "bash",
          "dart",
          "objectivec",
          "python",
          "r",
        ],
      },
      languageTabs: [
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
        {
          highlight: "javascript",
          language: "javascript",
          logoClass: "javascript",
        },
        {
          highlight: "kotlin",
          language: "kotlin",
          logoClass: "kotlin",
        },
      ],
    } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          productShop: {
            specPath: "https://docs.shopby.co.kr/spec/product-shop-public.yml ",
            outputDir: "docs/product/shop",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
         },
         orderShop: {
            specPath: "https://docs.shopby.co.kr/spec/order-shop-public.yml ",
            outputDir: "docs/order/shop",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
         },
        adminShop: {
            specPath: "https://docs.shopby.co.kr/spec/admin-shop-public.yml ",
            outputDir: "docs/admin/shop",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
         } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
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
    // [
    //   '@docusaurus/plugin-content-pages',
    //   {
    //     path: 'src/pages', // 페이지 폴더 경로 (기본값)
    //     // 추가 옵션 (선택 사항)
    //     // include: ['*.js', '*.jsx', '*.md', '*.mdx'],
    //     // exclude: ['**/_*.{js,jsx,ts,tsx}', '**/_*/**', '**/.{git,svn}/**', '**/node_modules/**'],
    //   },
    // ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

export default async function createConfig() {
  return config;
}
