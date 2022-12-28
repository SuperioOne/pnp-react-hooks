"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[9192],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=l(n),d=a,f=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[c]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(7294);const a="tooltip_Oc7l",o="tooltiptext_weba";function i(e){return r.createElement("div",{className:a},r.createElement("span",{className:o},e.text),e.children)}},7917:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905)),o=n(5653);const i={},p=void 0,s={unversionedId:"API/Sp/useUser",id:"API/Sp/useUser",title:"useUser",description:"Definition",source:"@site/docs/API/Sp/useUser.md",sourceDirName:"API/Sp",slug:"/API/Sp/useUser",permalink:"/pnp-react-hooks/API/Sp/useUser",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useSubWebs",permalink:"/pnp-react-hooks/API/Sp/useSubWebs"},next:{title:"useView",permalink:"/pnp-react-hooks/API/Sp/useView"}},l={},u=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],c={toc:u};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"definition"},"Definition"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"useUser"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"userId"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,a.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,a.kt)("inlineCode",{parentName:"p"},"ISiteUserInfo"),">"),(0,a.kt)("p",null,"Returns an user from site user collection."),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"userId")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"td"},"number")),(0,a.kt)("td",{parentName:"tr",align:"left"},"User Id, login name, email. ",(0,a.kt)(o.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"options?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/UserOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"UserOptions"))),(0,a.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"deps?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,a.kt)("td",{parentName:"tr",align:"left"},"useUser refreshes response data when one of the dependencies changes.")))),(0,a.kt)("h2",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,a.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,a.kt)("inlineCode",{parentName:"p"},"ISiteUserInfo"),">"),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// get site user by Id\nconst userById = useUser(27);\n\n// get site user by email\nconst userByEmail = useUser("user@example.onmicrosoft.com");\n\n// get site user by login name\nconst userByLoginName = useUser("i:0#.f|membership|user@example.onmicrosoft.com");\n\n// get site user with query\nconst userById = useUser(27, {\n    query: {\n        select: ["Id", "Title", "LoginName"]\n    }\n});\n')))}m.isMDXComponent=!0}}]);