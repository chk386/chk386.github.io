"use strict";(self.webpackChunklove_ayun=self.webpackChunklove_ayun||[]).push([[4212],{3250:(e,s,t)=>{t.r(s),t.d(s,{default:()=>g});t(6540);var a=t(4164),i=t(1213),r=t(7559),l=t(6461),n=t(3404),o=t(1463),c=t(1107),m=t(6913);const d={authorListItem:"authorListItem_n3yI"};var u=t(4848);function h(e){let{author:s}=e;return(0,u.jsx)("li",{className:d.authorListItem,children:(0,u.jsx)(m.A,{as:"h2",author:s,count:s.count})})}function b(e){let{authors:s}=e;return(0,u.jsx)("section",{className:(0,a.A)("margin-vert--lg",d.authorsListSection),children:(0,u.jsx)("ul",{children:s.map((e=>(0,u.jsx)(h,{author:e},e.key)))})})}function g(e){let{authors:s,sidebar:t}=e;const m=(0,l.uz)();return(0,u.jsxs)(i.e3,{className:(0,a.A)(r.G.wrapper.blogPages,r.G.page.blogAuthorsListPage),children:[(0,u.jsx)(i.be,{title:m}),(0,u.jsx)(o.A,{tag:"blog_authors_list"}),(0,u.jsxs)(n.A,{sidebar:t,children:[(0,u.jsx)(c.A,{as:"h1",children:m}),(0,u.jsx)(b,{authors:s})]})]})}},6461:(e,s,t)=>{t.d(s,{ZD:()=>l,uz:()=>n});t(6540);var a=t(1312),i=t(5846);t(4848);function r(){const{selectMessage:e}=(0,i.W)();return s=>e(s,(0,a.T)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:s}))}function l(e){const s=r();return(0,a.T)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:s(e.count),tagName:e.label})}const n=()=>(0,a.T)({id:"theme.blog.authorsList.pageTitle",message:"Authors",description:"The title of the authors page"})},3404:(e,s,t)=>{t.d(s,{A:()=>x});t(6540);var a=t(4164),i=t(8244),r=t(4581),l=t(8774),n=t(1312),o=t(4096);const c={sidebar:"sidebar_brwN",sidebarItemTitle:"sidebarItemTitle_r4Q1",sidebarItemList:"sidebarItemList_QwSx",sidebarItem:"sidebarItem_lnhn",sidebarItemLink:"sidebarItemLink_yNGZ",sidebarItemLinkActive:"sidebarItemLinkActive_oSRm"};var m=t(4848);function d(e){let{sidebar:s}=e;const t=(0,o.Gx)(s.items);return(0,m.jsx)("aside",{className:"col col--2",children:(0,m.jsxs)("nav",{className:(0,a.A)(c.sidebar,"thin-scrollbar"),"aria-label":(0,n.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,m.jsx)("div",{className:(0,a.A)(c.sidebarItemTitle,"margin-bottom--md"),children:s.title}),(0,m.jsx)("ul",{className:(0,a.A)(c.sidebarItemList,"clean-list"),children:t.map((e=>(0,m.jsx)("li",{className:c.sidebarItem,children:(0,m.jsx)(l.A,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var u=t(155),h=t(5600);function b(e){let{sidebar:s}=e;const t=(0,u.useVisibleBlogSidebarItems)(s.items);return(0,m.jsx)("ul",{className:"menu__list",children:t.map((e=>(0,m.jsx)("li",{className:"menu__list-item",children:(0,m.jsx)(l.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function g(e){return(0,m.jsx)(h.GX,{component:b,props:e})}function p(e){let{sidebar:s}=e;const t=(0,r.l)();return s?.items.length?"mobile"===t?(0,m.jsx)(g,{sidebar:s}):(0,m.jsx)(d,{sidebar:s}):null}function x(e){const{sidebar:s,toc:t,children:r,...l}=e,n=s&&s.items.length>0;return(0,m.jsx)(i.A,{...l,children:(0,m.jsx)("div",{className:"container margin-vert--lg",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsx)(p,{sidebar:s}),(0,m.jsx)("main",{className:(0,a.A)("col",{"col--8":n,"col--9 col--offset-1":!n}),children:r}),t&&(0,m.jsx)("div",{className:"col col--2",children:t})]})})})}}}]);