"use strict";(self.webpackChunklove_ayun=self.webpackChunklove_ayun||[]).push([[249],{3858:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});n(6540);var i=n(4164),a=n(1213),s=n(7559),r=n(7131),l=n(3404),o=n(9147),c=n(1312),d=n(9022),m=n(4848);function u(e){const{nextItem:t,prevItem:n}=e;return(0,m.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.T)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[n&&(0,m.jsx)(d.A,{...n,subLabel:(0,m.jsx)(c.A,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),t&&(0,m.jsx)(d.A,{...t,subLabel:(0,m.jsx)(c.A,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function g(){const{assets:e,metadata:t}=(0,r.e)(),{title:n,description:i,date:s,tags:l,authors:o,frontMatter:c}=t,{keywords:d}=c,u=e.image??c.image;return(0,m.jsxs)(a.be,{title:n,description:i,keywords:d,image:u,children:[(0,m.jsx)("meta",{property:"og:type",content:"article"}),(0,m.jsx)("meta",{property:"article:published_time",content:s}),o.some((e=>e.url))&&(0,m.jsx)("meta",{property:"article:author",content:o.map((e=>e.url)).filter(Boolean).join(",")}),l.length>0&&(0,m.jsx)("meta",{property:"article:tag",content:l.map((e=>e.label)).join(",")})]})}var h=n(5260),p=n(6676);function f(){const e=(0,p.J)();return(0,m.jsx)(h.A,{children:(0,m.jsx)("script",{type:"application/ld+json",children:JSON.stringify(e)})})}var b=n(7763),v=n(996);function x(e){let{sidebar:t,children:n}=e;const{metadata:i,toc:a}=(0,r.e)(),{nextItem:s,prevItem:c,frontMatter:d,unlisted:g}=i,{hide_table_of_contents:h,toc_min_heading_level:p,toc_max_heading_level:f}=d;return(0,m.jsxs)(l.A,{sidebar:t,toc:!h&&a.length>0?(0,m.jsx)(b.A,{toc:a,minHeadingLevel:p,maxHeadingLevel:f}):void 0,children:[g&&(0,m.jsx)(v.A,{}),(0,m.jsx)(o.A,{children:n}),(s||c)&&(0,m.jsx)(u,{nextItem:s,prevItem:c})]})}function j(e){const t=e.content;return(0,m.jsx)(r.i,{content:e.content,isBlogPostPage:!0,children:(0,m.jsxs)(a.e3,{className:(0,i.A)(s.G.wrapper.blogPages,s.G.page.blogPostPage),children:[(0,m.jsx)(g,{}),(0,m.jsx)(f,{}),(0,m.jsx)(x,{sidebar:e.sidebar,children:(0,m.jsx)(t,{})})]})})}},7763:(e,t,n)=>{n.d(t,{A:()=>c});n(6540);var i=n(4164),a=n(5195);const s={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var r=n(4848);const l="table-of-contents__link toc-highlight",o="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,r.jsx)("div",{className:(0,i.A)(s.tableOfContents,"thin-scrollbar",t),children:(0,r.jsx)(a.A,{...n,linkClassName:l,linkActiveClassName:o})})}},5195:(e,t,n)=>{n.d(t,{A:()=>p});var i=n(6540),a=n(6342);function s(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const i=n.slice(2,e.level);e.parentIndex=Math.max(...i),n[e.level]=t}));const i=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):i.push(a)})),i}function r(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return t.flatMap((e=>{const t=r({toc:e.children,minHeadingLevel:n,maxHeadingLevel:i});return function(e){return e.level>=n&&e.level<=i}(e)?[{...e,children:t}]:t}))}function l(e){const t=e.getBoundingClientRect();return t.top===t.bottom?l(e.parentNode):t}function o(e,t){let{anchorTopOffset:n}=t;const i=e.find((e=>l(e).top>=n));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function c(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:t}}=(0,a.p)();return(0,i.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function d(e){const t=(0,i.useRef)(void 0),n=c();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:a,minHeadingLevel:s,maxHeadingLevel:r}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),l=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const i=[];for(let a=t;a<=n;a+=1)i.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:s,maxHeadingLevel:r}),c=o(l,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===d)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,n])}var m=n(8774),u=n(4848);function g(e){let{toc:t,className:n,linkClassName:i,isChild:a}=e;return t.length?(0,u.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,u.jsxs)("li",{children:[(0,u.jsx)(m.A,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,u.jsx)(g,{isChild:!0,toc:e.children,className:n,linkClassName:i})]},e.id)))}):null}const h=i.memo(g);function p(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:c,maxHeadingLevel:m,...g}=e;const p=(0,a.p)(),f=c??p.tableOfContents.minHeadingLevel,b=m??p.tableOfContents.maxHeadingLevel,v=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,i.useMemo)((()=>r({toc:s(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:f,maxHeadingLevel:b});return d((0,i.useMemo)((()=>{if(l&&o)return{linkClassName:l,linkActiveClassName:o,minHeadingLevel:f,maxHeadingLevel:b}}),[l,o,f,b])),(0,u.jsx)(h,{toc:v,className:n,linkClassName:l,...g})}},996:(e,t,n)=>{n.d(t,{A:()=>g});n(6540);var i=n(4164),a=n(1312),s=n(5260),r=n(4848);function l(){return(0,r.jsx)(a.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,r.jsx)(a.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,r.jsx)(s.A,{children:(0,r.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(7559),m=n(7293);function u(e){let{className:t}=e;return(0,r.jsx)(m.A,{type:"caution",title:(0,r.jsx)(l,{}),className:(0,i.A)(t,d.G.common.unlistedBanner),children:(0,r.jsx)(o,{})})}function g(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c,{}),(0,r.jsx)(u,{...e})]})}},6676:(e,t,n)=>{n.d(t,{k:()=>d,J:()=>m});var i=n(6025),a=n(4586),s=n(6803);var r=n(7131);const l=e=>new Date(e).toISOString();function o(e){const t=e.map(u);return{author:1===t.length?t[0]:t}}function c(e,t,n){return e?{image:g({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${n}`})}:{}}function d(e){const{siteConfig:t}=(0,a.A)(),{withBaseUrl:n}=(0,i.hH)(),{metadata:{blogDescription:s,blogTitle:r,permalink:d}}=e,m=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":m,mainEntityOfPage:m,headline:r,description:s,blogPost:e.items.map((e=>function(e,t,n){const{assets:i,frontMatter:a,metadata:s}=e,{date:r,title:d,description:m,lastUpdatedAt:u}=s,g=i.image??a.image,h=a.keywords??[],p=`${t.url}${s.permalink}`,f=u?l(u):void 0;return{"@type":"BlogPosting","@id":p,mainEntityOfPage:p,url:p,headline:d,name:d,description:m,datePublished:r,...f?{dateModified:f}:{},...o(s.authors),...c(g,n,d),...h?{keywords:h}:{}}}(e.content,t,n)))}}function m(){const e=function(){const e=(0,s.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:n}=(0,r.e)(),{siteConfig:d}=(0,a.A)(),{withBaseUrl:m}=(0,i.hH)(),{date:u,title:g,description:h,frontMatter:p,lastUpdatedAt:f}=n,b=t.image??p.image,v=p.keywords??[],x=f?l(f):void 0,j=`${d.url}${n.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":j,mainEntityOfPage:j,url:j,headline:g,name:g,description:h,datePublished:u,...x?{dateModified:x}:{},...o(n.authors),...c(b,m,g),...v?{keywords:v}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function u(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function g(e){let{imageUrl:t,caption:n}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:n}}},3404:(e,t,n)=>{n.d(t,{A:()=>f});n(6540);var i=n(4164),a=n(781),s=n(4581),r=n(8774),l=n(1312),o=n(4255);const c={sidebar:"sidebar_brwN",sidebarItemTitle:"sidebarItemTitle_r4Q1",sidebarItemList:"sidebarItemList_QwSx",sidebarItem:"sidebarItem_lnhn",sidebarItemLink:"sidebarItemLink_yNGZ",sidebarItemLinkActive:"sidebarItemLinkActive_oSRm"};var d=n(4848);function m(e){let{sidebar:t}=e;const n=(0,o.G)(t.items);return(0,d.jsx)("aside",{className:"col col--2",children:(0,d.jsxs)("nav",{className:(0,i.A)(c.sidebar,"thin-scrollbar"),"aria-label":(0,l.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,d.jsx)("div",{className:(0,i.A)(c.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,d.jsx)("ul",{className:(0,i.A)(c.sidebarItemList,"clean-list"),children:n.map((e=>(0,d.jsx)("li",{className:c.sidebarItem,children:(0,d.jsx)(r.A,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var u=n(5600);function g(e){let{sidebar:t}=e;const n=(0,o.G)(t.items);return(0,d.jsx)("ul",{className:"menu__list",children:n.map((e=>(0,d.jsx)("li",{className:"menu__list-item",children:(0,d.jsx)(r.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function h(e){return(0,d.jsx)(u.GX,{component:g,props:e})}function p(e){let{sidebar:t}=e;const n=(0,s.l)();return t?.items.length?"mobile"===n?(0,d.jsx)(h,{sidebar:t}):(0,d.jsx)(m,{sidebar:t}):null}function f(e){const{sidebar:t,toc:n,children:s,...r}=e,l=t&&t.items.length>0;return(0,d.jsx)(a.A,{...r,children:(0,d.jsx)("div",{className:"container margin-vert--lg",children:(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)(p,{sidebar:t}),(0,d.jsx)("main",{className:(0,i.A)("col",{"col--8":l,"col--9 col--offset-1":!l}),children:s}),n&&(0,d.jsx)("div",{className:"col col--2",children:n})]})})})}},9147:(e,t,n)=>{n.d(t,{A:()=>r});n(6540);var i=n(4651),a=n(2171),s=n(4848);function r(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.A,{...e}),(0,s.jsx)(l,{})]})}function l(){return(0,s.jsx)(a.A,{id:"comments",repo:"chk386/chk386.github.io",repoId:"R_kgDOMJx1QQ",category:"General",categoryId:"DIC_kwDOMJx1Qc4CgQx2",mapping:"pathname",term:"Welcome to @giscus/react component!",reactionsEnabled:"1",emitMetadata:"0",inputPosition:"top",theme:"light",lang:"ko",loading:"lazy"})}}}]);