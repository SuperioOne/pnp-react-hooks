"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[9847],{9613:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>d});var n=r(9496);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},m=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=l(r),c=a,d=u["".concat(s,".").concat(c)]||u[c]||f[c]||o;return r?n.createElement(d,p(p({ref:t},m),{},{components:r})):n.createElement(d,p({ref:t},m))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,p=new Array(o);p[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:a,p[1]=i;for(var l=2;l<o;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},8532:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(9496);const a={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function o(e){return n.createElement("div",{className:a.tooltip},n.createElement("span",{className:a.tooltiptext},e.text),e.children)}},2394:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>p,metadata:()=>s,toc:()=>m});var n=r(1163),a=(r(9496),r(9613)),o=r(8532);const p={},i=void 0,s={unversionedId:"API/Sp/useIsMemberOf",id:"API/Sp/useIsMemberOf",title:"useIsMemberOf",description:"Definition",source:"@site/docs/API/Sp/useIsMemberOf.md",sourceDirName:"API/Sp",slug:"/API/Sp/useIsMemberOf",permalink:"/pnp-react-hooks/API/Sp/useIsMemberOf",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useHasPermission",permalink:"/pnp-react-hooks/API/Sp/useHasPermission"},next:{title:"useItemComments",permalink:"/pnp-react-hooks/API/Sp/useItemComments"}},l={},m=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],u={toc:m},f="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(f,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"definition"},"Definition"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"useIsMemberOf"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"groupId"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"deps?"),"): ","[",(0,a.kt)("inlineCode",{parentName:"p"},"Nullable<boolean>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Nullable<ISiteGroupInfo>"),"]"),(0,a.kt)("p",null,"Returns ",(0,a.kt)("inlineCode",{parentName:"p"},"true"),", if user is member of group. If not returns ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),". Use ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/IsMemberOfOptions#userid"},(0,a.kt)("inlineCode",{parentName:"a"},"IsMemberOfOptions.userId"))," property for another user. Default is current user."),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"groupId")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"td"},"number")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Group name or Id. ",(0,a.kt)(o.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"options?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/IsMemberOfOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"IsMemberOfOptions"))),(0,a.kt)("td",{parentName:"tr",align:"left"},"Pnp hook options.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"deps?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,a.kt)("td",{parentName:"tr",align:"left"},"useIsMemberOf refreshes response data when one of the dependencies changes.")))),(0,a.kt)("h2",{id:"returns"},"Returns"),(0,a.kt)("p",null,"[",(0,a.kt)("inlineCode",{parentName:"p"},"Nullable<boolean>"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Nullable<ISiteGroupInfo>"),"]"),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// get current user membership info for group\nconst [isMember, groupInfo] = useIsMemberOf(10);\n\n// get user membership info for group\nconst [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {\n    userId: "user@example.onmicrosoft.com"\n});\n\n// get user membership info for group\nconst [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {\n    userId: 25\n});\n\n// get user membership info for group\nconst [isMember, groupInfo] = useIsMemberOf(10, {\n    userId: "i:0#.f|membership|user@example.onmicrosoft.com"\n});\n')))}c.isMDXComponent=!0}}]);