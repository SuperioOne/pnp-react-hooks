"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[5128],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||c[m]||o;return n?r.createElement(f,p(p({ref:t},s),{},{components:n})):r.createElement(f,p({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,p[1]=i;for(var u=2;u<o;u++)p[u]=n[u];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(7294),a="tooltip_Oc7l",o="tooltiptext_weba";function p(e){return r.createElement("div",{className:a},r.createElement("span",{className:o},e.text),e.children)}},858:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),p=n(5653),i=["components"],l={},u=void 0,s={unversionedId:"API/Sp/useGroup",id:"API/Sp/useGroup",title:"useGroup",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useGroup.md",sourceDirName:"API/Sp",slug:"/API/Sp/useGroup",permalink:"/API/Sp/useGroup",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useFolders",permalink:"/API/Sp/useFolders"},next:{title:"useGroupUser",permalink:"/API/Sp/useGroupUser"}},c={},d=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],m={toc:d};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"definition"},"Definition"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("strong",{parentName:"p"},"useGroup"),"(",(0,o.kt)("inlineCode",{parentName:"p"},"groupId"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,o.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("inlineCode",{parentName:"p"},"ISiteGroupInfo"),">"),(0,o.kt)("p",null,"Returns a group from group collection."),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"groupId")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,o.kt)("inlineCode",{parentName:"td"},"number")),(0,o.kt)("td",{parentName:"tr",align:"left"},"Group Id or name. ",(0,o.kt)(p.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"options?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/API/Interfaces/GroupOptions"},(0,o.kt)("inlineCode",{parentName:"a"},"GroupOptions"))),(0,o.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"deps?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,o.kt)("td",{parentName:"tr",align:"left"},"useGroup will resend request when one of the dependencies changed.")))),(0,o.kt)("h2",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("inlineCode",{parentName:"p"},"ISiteGroupInfo"),">"),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'// get group info by Id\nconst group = useGroup(10);\n\n// get group info by name\nconst mySpGroup = useGroup("My SharePoint Group");\n\n// get group with query\nconst mySpGroup = useGroup("My SharePoint Group", {\n    query: {\n        select: ["Title", "Id"]\n    }\n});\n')))}f.isMDXComponent=!0}}]);