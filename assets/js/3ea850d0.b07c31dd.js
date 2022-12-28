"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[6630],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),i=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=i(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=i(r),m=a,f=c["".concat(s,".").concat(m)]||c[m]||d[m]||l;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[c]="string"==typeof e?e:a,o[1]=p;for(var i=2;i<l;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1432:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>i});var n=r(7462),a=(r(7294),r(3905));const l={},o=void 0,p={unversionedId:"API/Interfaces/SpSearchResult",id:"API/Interfaces/SpSearchResult",title:"SpSearchResult",description:"Properties",source:"@site/docs/API/Interfaces/SpSearchResult.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/SpSearchResult",permalink:"/pnp-react-hooks/API/Interfaces/SpSearchResult",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SiteUsersOptions",permalink:"/pnp-react-hooks/API/Interfaces/SiteUsersOptions"},next:{title:"SubWebsOptions",permalink:"/pnp-react-hooks/API/Interfaces/SubWebsOptions"}},s={},i=[{value:"Properties",id:"properties",level:2},{value:"CurrentPage",id:"currentpage",level:3},{value:"ElapsedTime",id:"elapsedtime",level:3},{value:"PrimarySearchResults",id:"primarysearchresults",level:3},{value:"RawSearchResults",id:"rawsearchresults",level:3},{value:"RowCount",id:"rowcount",level:3},{value:"TotalRows",id:"totalrows",level:3},{value:"TotalRowsIncludingDuplicates",id:"totalrowsincludingduplicates",level:3}],u={toc:i};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"currentpage"},"CurrentPage"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"CurrentPage"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"elapsedtime"},"ElapsedTime"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"ElapsedTime"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"primarysearchresults"},"PrimarySearchResults"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"PrimarySearchResults"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"ISearchResult"),"[]"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"rawsearchresults"},"RawSearchResults"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"RawSearchResults"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"ISearchResponse")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"rowcount"},"RowCount"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"RowCount"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"totalrows"},"TotalRows"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"TotalRows"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"totalrowsincludingduplicates"},"TotalRowsIncludingDuplicates"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"TotalRowsIncludingDuplicates"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")))}c.isMDXComponent=!0}}]);