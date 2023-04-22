"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[113],{5009:(e,t,a)=>{a.d(t,{Z:()=>p});var l=a(9496),r=a(5924),n=a(1120),o=a(4167),s=a(6979),i=a(5418);const c={sidebar:"sidebar_jmrS",sidebarItemTitle:"sidebarItemTitle_be2k",sidebarItemList:"sidebarItemList_RRZk",sidebarItem:"sidebarItem_Jht4",sidebarItemLink:"sidebarItemLink_qVqi",sidebarItemLinkActive:"sidebarItemLinkActive_zKeg"};function m(e){let{sidebar:t}=e;return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,r.Z)(c.sidebar,"thin-scrollbar"),"aria-label":(0,i.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.Z)(c.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,r.Z)(c.sidebarItemList,"clean-list")},t.items.map((e=>l.createElement("li",{key:e.permalink,className:c.sidebarItem},l.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive},e.title)))))))}var u=a(5545);function d(e){let{sidebar:t}=e;return l.createElement("ul",{className:"menu__list"},t.items.map((e=>l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title)))))}function g(e){return l.createElement(u.Zo,{component:d,props:e})}function h(e){let{sidebar:t}=e;const a=(0,o.i)();return t?.items.length?"mobile"===a?l.createElement(g,{sidebar:t}):l.createElement(m,{sidebar:t}):null}function p(e){const{sidebar:t,toc:a,children:o,...s}=e,i=t&&t.items.length>0;return l.createElement(n.Z,s,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(h,{sidebar:t}),l.createElement("main",{className:(0,r.Z)("col",{"col--7":i,"col--9 col--offset-1":!i}),itemScope:!0,itemType:"http://schema.org/Blog"},o),a&&l.createElement("div",{className:"col col--2"},a))))}},2200:(e,t,a)=>{a.d(t,{Z:()=>D});var l=a(9496),r=a(5924),n=a(2262),o=a(3500);function s(e){let{children:t,className:a}=e;const{frontMatter:r,assets:s}=(0,n.C)(),{withBaseUrl:i}=(0,o.C)(),c=s.image??r.image;return l.createElement("article",{className:a,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},c&&l.createElement("meta",{itemProp:"image",content:i(c,{absolute:!0})}),t)}var i=a(6979);const c={title:"title_hGBx"};function m(e){let{className:t}=e;const{metadata:a,isBlogPostPage:o}=(0,n.C)(),{permalink:s,title:m}=a,u=o?"h1":"h2";return l.createElement(u,{className:(0,r.Z)(c.title,t),itemProp:"headline"},o?m:l.createElement(i.Z,{itemProp:"url",to:s},m))}var u=a(5418),d=a(4423);const g=["zero","one","two","few","many","other"];function h(e){return g.filter((t=>e.includes(t)))}const p={locale:"en",pluralForms:h(["one","other"]),select:e=>1===e?"one":"other"};function b(){const{i18n:{currentLocale:e}}=(0,d.Z)();return(0,l.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:h(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),p}}),[e])}function E(){const e=b();return{selectMessage:(t,a)=>function(e,t,a){const l=e.split("|");if(1===l.length)return l[0];l.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${l.length}: ${e}`);const r=a.select(t),n=a.pluralForms.indexOf(r);return l[Math.min(n,l.length-1)]}(a,t,e)}}const f={container:"container_ock6"};function v(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=E();return t=>{const a=Math.ceil(t);return e(a,(0,u.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return l.createElement(l.Fragment,null,a(t))}function N(e){let{date:t,formattedDate:a}=e;return l.createElement("time",{dateTime:t,itemProp:"datePublished"},a)}function P(){return l.createElement(l.Fragment,null," \xb7 ")}function _(e){let{className:t}=e;const{metadata:a}=(0,n.C)(),{date:o,formattedDate:s,readingTime:i}=a;return l.createElement("div",{className:(0,r.Z)(f.container,"margin-vert--md",t)},l.createElement(N,{date:o,formattedDate:s}),void 0!==i&&l.createElement(l.Fragment,null,l.createElement(P,null),l.createElement(v,{readingTime:i})))}function k(e){return e.href?l.createElement(i.Z,e):l.createElement(l.Fragment,null,e.children)}function Z(e){let{author:t,className:a}=e;const{name:n,title:o,url:s,imageURL:i,email:c}=t,m=s||c&&`mailto:${c}`||void 0;return l.createElement("div",{className:(0,r.Z)("avatar margin-bottom--sm",a)},i&&l.createElement(k,{href:m,className:"avatar__photo-link"},l.createElement("img",{className:"avatar__photo",src:i,alt:n})),n&&l.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},l.createElement("div",{className:"avatar__name"},l.createElement(k,{href:m,itemProp:"url"},l.createElement("span",{itemProp:"name"},n))),o&&l.createElement("small",{className:"avatar__subtitle",itemProp:"description"},o)))}const I={authorCol:"authorCol_hFiA",imageOnlyAuthorRow:"imageOnlyAuthorRow_gO0N",imageOnlyAuthorCol:"imageOnlyAuthorCol_TVFI"};function C(e){let{className:t}=e;const{metadata:{authors:a},assets:o}=(0,n.C)();if(0===a.length)return null;const s=a.every((e=>{let{name:t}=e;return!t}));return l.createElement("div",{className:(0,r.Z)("margin-top--md margin-bottom--sm",s?I.imageOnlyAuthorRow:"row",t)},a.map(((e,t)=>l.createElement("div",{className:(0,r.Z)(!s&&"col col--6",s?I.imageOnlyAuthorCol:I.authorCol),key:t},l.createElement(Z,{author:{...e,imageURL:o.authorsImageUrls[t]??e.imageURL}})))))}function T(){return l.createElement("header",null,l.createElement(m,null),l.createElement(_,null),l.createElement(C,null))}var F=a(122),w=a(7575);function y(e){let{children:t,className:a}=e;const{isBlogPostPage:o}=(0,n.C)();return l.createElement("div",{id:o?F.blogPostContainerID:void 0,className:(0,r.Z)("markdown",a),itemProp:"articleBody"},l.createElement(w.Z,null,t))}var L=a(2518),A=a(7231),B=a(1163);function R(){return l.createElement("b",null,l.createElement(u.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))}function M(e){const{blogPostTitle:t,...a}=e;return l.createElement(i.Z,(0,B.Z)({"aria-label":(0,u.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t})},a),l.createElement(R,null))}const x={blogPostFooterDetailsFull:"blogPostFooterDetailsFull_RHrl"};function O(){const{metadata:e,isBlogPostPage:t}=(0,n.C)(),{tags:a,title:o,editUrl:s,hasTruncateMarker:i}=e,c=!t&&i,m=a.length>0;return m||c||s?l.createElement("footer",{className:(0,r.Z)("row docusaurus-mt-lg",t&&x.blogPostFooterDetailsFull)},m&&l.createElement("div",{className:(0,r.Z)("col",{"col--9":c})},l.createElement(A.Z,{tags:a})),t&&s&&l.createElement("div",{className:"col margin-top--sm"},l.createElement(L.Z,{editUrl:s})),c&&l.createElement("div",{className:(0,r.Z)("col text--right",{"col--3":m})},l.createElement(M,{blogPostTitle:o,to:e.permalink}))):null}function D(e){let{children:t,className:a}=e;const o=function(){const{isBlogPostPage:e}=(0,n.C)();return e?void 0:"margin-bottom--xl"}();return l.createElement(s,{className:(0,r.Z)(o,a)},l.createElement(T,null),l.createElement(y,null,t),l.createElement(O,null))}},2262:(e,t,a)=>{a.d(t,{C:()=>s,n:()=>o});var l=a(9496),r=a(8301);const n=l.createContext(null);function o(e){let{children:t,content:a,isBlogPostPage:r=!1}=e;const o=function(e){let{content:t,isBlogPostPage:a}=e;return(0,l.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:r});return l.createElement(n.Provider,{value:o},t)}function s(){const e=(0,l.useContext)(n);if(null===e)throw new r.i6("BlogPostProvider");return e}}}]);