"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[8280],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,f=m["".concat(p,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(7294),a="tooltip_Oc7l",i="tooltiptext_weba";function o(e){return r.createElement("div",{className:a},r.createElement("span",{className:i},e.text),e.children)}},7470:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return m}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(5653),l=["components"],p={},s=void 0,u={unversionedId:"API/Sp/useUser",id:"API/Sp/useUser",title:"useUser",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useUser.md",sourceDirName:"API/Sp",slug:"/API/Sp/useUser",permalink:"/API/Sp/useUser",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useSubWebs",permalink:"/API/Sp/useSubWebs"},next:{title:"useWebInfo",permalink:"/API/Sp/useWebInfo"}},c={},m=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],d={toc:m};function f(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"definition"},"Definition"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"useUser"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"userId"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"ISiteUserInfo"),">"),(0,i.kt)("p",null,"Returns an user from site user collection."),(0,i.kt)("h2",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"userId")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},"User Id, login name, email. ",(0,i.kt)(o.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/API/Interfaces/UserOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"UserOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"deps?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,i.kt)("td",{parentName:"tr",align:"left"},"useUser will resend request when one of the dependencies changed.")))),(0,i.kt)("h2",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"ISiteUserInfo"),">"),(0,i.kt)("h2",{id:"examples"},"Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// get site user by Id\nconst userById = useUser(27);\n\n// get site user by email\nconst userByEmail = useUser("user@example.onmicrosoft.com");\n\n// get site user by login name\nconst userByLoginName = useUser("i:0#.f|membership|user@example.onmicrosoft.com");\n\n// get site user with query\nconst userById = useUser(27, {\n    query: {\n        select: ["Id", "Title", "LoginName"]\n    }\n});\n')))}f.isMDXComponent=!0}}]);