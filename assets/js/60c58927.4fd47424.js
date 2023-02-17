"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[194],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),c=s(n),u=r,f=c["".concat(l,".").concat(u)]||c[u]||d[u]||i;return n?a.createElement(f,o(o({ref:t},m),{},{components:n})):a.createElement(f,o({ref:t},m))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[c]="string"==typeof e?e:r,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5653:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294);const r={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function i(e){return a.createElement("div",{className:r.tooltip},a.createElement("span",{className:r.tooltiptext},e.text),e.children)}},4858:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>m});var a=n(7462),r=(n(7294),n(3905)),i=n(5653);const o={},p=void 0,l={unversionedId:"API/Sp/useAttachments",id:"API/Sp/useAttachments",title:"useAttachments",description:"Definition",source:"@site/docs/API/Sp/useAttachments.md",sourceDirName:"API/Sp",slug:"/API/Sp/useAttachments",permalink:"/pnp-react-hooks/API/Sp/useAttachments",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useAttachment",permalink:"/pnp-react-hooks/API/Sp/useAttachment"},next:{title:"useChanges",permalink:"/pnp-react-hooks/API/Sp/useChanges"}},s={},m=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],c={toc:m},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"definition"},"Definition"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useAttachments"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"itemId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"list"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"IAttachmentInfo"),"[]",">"),(0,r.kt)("p",null,"Returns all attachments of the item."),(0,r.kt)("h2",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"itemId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:"left"},"List item numeric Id. ",(0,r.kt)(i.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"list")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"List title or GUID Id string. ",(0,r.kt)(i.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/ItemAttachmentsOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"ItemAttachmentsOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useAttachments refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h2",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"IAttachmentInfo"),"[]",">"),(0,r.kt)("p",null,"array of ",(0,r.kt)("inlineCode",{parentName:"p"},"IAttachmentInfo"),"."),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'// basic usage\nconst attachments = useAttachments(10, "My List");\n\n// with query\nconst filteredAttachments = useAttachments(10, "5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    query: {\n        select: ["Name", "Id"],\n        filter: "substringof(\'.pdf\', Name) eq true"\n    }\n});\n')))}u.isMDXComponent=!0}}]);