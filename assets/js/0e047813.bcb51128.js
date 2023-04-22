"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[1672],{9613:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(9496);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(r),u=a,f=d["".concat(l,".").concat(u)]||d[u]||k[u]||o;return r?n.createElement(f,p(p({ref:t},c),{},{components:r})):n.createElement(f,p({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=r[s];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1858:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>k,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=r(1163),a=(r(9496),r(9613));const o={},p=void 0,i={unversionedId:"API/Interfaces/PnpHookGlobalOptions",id:"API/Interfaces/PnpHookGlobalOptions",title:"PnpHookGlobalOptions",description:"Hierarchy",source:"@site/docs/API/Interfaces/PnpHookGlobalOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/PnpHookGlobalOptions",permalink:"/pnp-react-hooks/API/Interfaces/PnpHookGlobalOptions",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PagedItemsOptions",permalink:"/pnp-react-hooks/API/Interfaces/PagedItemsOptions"},next:{title:"PnpHookOptions",permalink:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"}},l={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"disabled",id:"disabled",level:3},{value:"Overrides",id:"overrides",level:4},{value:"error",id:"error",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"sp",id:"sp",level:3}],c={toc:s},d="wrapper";function k(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ErrorOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorOptions")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/RenderOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"RenderOptions")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Required"),"<",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ContextOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"ContextOptions")),">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"PnpHookGlobalOptions"))))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"disabled"},"disabled"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"disabled"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},'"auto"')),(0,a.kt)("p",null,"Disable all hook calls in child components."),(0,a.kt)("h4",{id:"overrides"},"Overrides"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/RenderOptions"},"RenderOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/RenderOptions#disabled"},"disabled")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"error"},"error"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"error"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/ErrorFunc#errorfunc"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,a.kt)("p",null,"Error handling. Default is ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode#default"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ErrorOptions"},"ErrorOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ErrorOptions#error"},"error")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("p",null,"Keep previous state until new request is resolved rather than clearing the state as ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),". Default value is ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/RenderOptions"},"RenderOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/RenderOptions#keeppreviousstate"},"keepPreviousState")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sp"},"sp"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"sp"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,a.kt)("p",null,"Pnp SP context."))}k.isMDXComponent=!0}}]);