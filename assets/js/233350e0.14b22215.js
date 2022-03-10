"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[1798],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return c}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),k=s(r),c=a,f=k["".concat(l,".").concat(c)]||k[c]||d[c]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=k;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},5653:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(7294),a="tooltip_Oc7l",o="tooltiptext_weba";function i(e){return n.createElement("div",{className:a},n.createElement("span",{className:o},e.text),e.children)}},884:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return k}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=r(5653),p=["components"],l={},s=void 0,u={unversionedId:"API/Interfaces/UserOptions",id:"API/Interfaces/UserOptions",title:"UserOptions",description:"Hierarchy",source:"@site/pnp-react-hooks/docs/API/Interfaces/UserOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/UserOptions",permalink:"/API/Interfaces/UserOptions",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"TreeContext",permalink:"/API/Interfaces/TreeContext"},next:{title:"UserPermissionOptions",permalink:"/API/Interfaces/UserPermissionOptions"}},d={},k=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"behaviors",id:"behaviors",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"disabled",id:"disabled",level:3},{value:"Overrides",id:"overrides",level:4},{value:"error",id:"error",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"query",id:"query",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"sp",id:"sp",level:3},{value:"Inherited from",id:"inherited-from-4",level:4}],c={toc:k};function f(e){var t=e.components,r=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},(0,o.kt)("inlineCode",{parentName:"a"},"PnpHookOptions")),"<",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/ODataQueryable"},(0,o.kt)("inlineCode",{parentName:"a"},"ODataQueryable")),">"),(0,o.kt)("p",{parentName:"li"},"\u21b3 ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"},"UserOptions"))))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"behaviors"},"behaviors"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"behaviors"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"TimelinePipe"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"any"),">","[]"),(0,o.kt)("p",null,"Additional behaviors for hooks PnP request."),(0,o.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#behaviors"},"behaviors")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"disabled"},"disabled"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"disabled"),": ",(0,o.kt)("a",{parentName:"p",href:"/API/Types/DisableOptionType#disableoptionvaluetype"},(0,o.kt)("inlineCode",{parentName:"a"},"DisableOptionValueType"))," ","|"," (",(0,o.kt)("inlineCode",{parentName:"p"},"userId"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,o.kt)("inlineCode",{parentName:"p"},"number"),") => ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Disable hook calls and renders."),(0,o.kt)("h4",{id:"overrides"},"Overrides"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#disabled"},"disabled")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"error"},"error"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"error"),": ",(0,o.kt)("a",{parentName:"p",href:"/API/Types/ErrorFunc#errorfunc"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,o.kt)("a",{parentName:"p",href:"/API/Enums/ErrorMode"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,o.kt)("p",null,"Error handling. Default is ",(0,o.kt)("a",{parentName:"p",href:"/API/Enums/ErrorMode#default"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,o.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#error"},"error")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Keep previous state until new request resolves rather than clearing the state as ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),". Default is ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#keeppreviousstate"},"keepPreviousState")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"query"},"query"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"query"),": ",(0,o.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/ODataQueryable"},(0,o.kt)("inlineCode",{parentName:"a"},"ODataQueryable")),">"),(0,o.kt)("p",null,"OData query. ",(0,o.kt)(i.Z,{text:"Any meaningful change repeats request",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#query"},"query")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"sp"},"sp"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"sp"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,o.kt)("p",null,"Pnp SP context. ",(0,o.kt)(i.Z,{text:"Changing sp value repeats request",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/API/Interfaces/PnpHookOptions#sp"},"sp")))}f.isMDXComponent=!0}}]);