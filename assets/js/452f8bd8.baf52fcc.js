"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[5862],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,k=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(k,i(i({ref:t},c),{},{components:n})):r.createElement(k,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(7294),a="tooltip_Oc7l",o="tooltiptext_weba";function i(e){return r.createElement("div",{className:a},r.createElement("span",{className:o},e.text),e.children)}},1109:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=n(5653),p=["components"],l={},s=void 0,c={unversionedId:"API/Sp/useListChangeToken",id:"API/Sp/useListChangeToken",title:"useListChangeToken",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useListChangeToken.md",sourceDirName:"API/Sp",slug:"/API/Sp/useListChangeToken",permalink:"/pnp-react-hooks/API/Sp/useListChangeToken",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useList",permalink:"/pnp-react-hooks/API/Sp/useList"},next:{title:"useListItem",permalink:"/pnp-react-hooks/API/Sp/useListItem"}},u={},d=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2},{value:"Remarks",id:"remarks",level:2}],m={toc:d};function k(e){var t=e.components,n=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"definition"},"Definition"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("strong",{parentName:"p"},"useListChangeToken"),"(",(0,o.kt)("inlineCode",{parentName:"p"},"list"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/IChangeTokenInfo"},(0,o.kt)("inlineCode",{parentName:"a"},"IChangeTokenInfo")),">"),(0,o.kt)("p",null,"Returns list current change token and last modified dates."),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"list")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:"left"},"List GUID id or title. ",(0,o.kt)(i.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"options?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/ListTokenOptions"},(0,o.kt)("inlineCode",{parentName:"a"},"ListTokenOptions"))),(0,o.kt)("td",{parentName:"tr",align:"left"},"Pnp hook options.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"deps?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,o.kt)("td",{parentName:"tr",align:"left"},"useListChangeToken will resend request when one of the dependencies changed.")))),(0,o.kt)("h2",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/IChangeTokenInfo"},(0,o.kt)("inlineCode",{parentName:"a"},"IChangeTokenInfo")),">"),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'// get token by list Id\nconst changeToken = useListChangeToken("5ee53613-bc0f-4b2a-9904-b21afd8431a7");\n\n// get token by list title\nconst changeToken = useListChangeToken("My List Title");\n')),(0,o.kt)("h2",{id:"remarks"},"Remarks"),(0,o.kt)("p",null,"You can also use ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Sp/useList"},(0,o.kt)("inlineCode",{parentName:"a"},"useList"))," to get exact same change info."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'const listInfo = useList("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    query: {\n        select: [ "CurrentChangeToken",\n                "LastItemDeletedDate",\n                "LastItemModifiedDate",\n                "LastItemUserModifiedDate" ]\n    }\n});\n')))}k.isMDXComponent=!0}}]);