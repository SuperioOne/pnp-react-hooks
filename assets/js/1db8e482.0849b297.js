"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[7715],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},d=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},k="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),k=s(r),u=o,h=k["".concat(l,".").concat(u)]||k[u]||c[u]||a;return r?n.createElement(h,p(p({ref:t},d),{},{components:r})):n.createElement(h,p({ref:t},d))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,p=new Array(a);p[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[k]="string"==typeof e?e:o,p[1]=i;for(var s=2;s<a;s++)p[s]=r[s];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},5653:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(7294);const o="tooltip_Oc7l",a="tooltiptext_weba";function p(e){return n.createElement("div",{className:o},n.createElement("span",{className:a},e.text),e.children)}},3673:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>p,metadata:()=>l,toc:()=>d});var n=r(7462),o=(r(7294),r(3905)),a=r(5653);const p={},i=void 0,l={unversionedId:"API/Interfaces/FoldersOptions",id:"API/Interfaces/FoldersOptions",title:"FoldersOptions",description:"Hierarchy",source:"@site/docs/API/Interfaces/FoldersOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/FoldersOptions",permalink:"/pnp-react-hooks/API/Interfaces/FoldersOptions",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"FolderTreeOptions",permalink:"/pnp-react-hooks/API/Interfaces/FolderTreeOptions"},next:{title:"GroupOptions",permalink:"/pnp-react-hooks/API/Interfaces/GroupOptions"}},s={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"behaviors",id:"behaviors",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"disabled",id:"disabled",level:3},{value:"Overrides",id:"overrides",level:4},{value:"error",id:"error",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"query",id:"query",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"rootFolderId",id:"rootfolderid",level:3},{value:"sp",id:"sp",level:3},{value:"Inherited from",id:"inherited-from-4",level:4}],k={toc:d};function c(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},k,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},(0,o.kt)("inlineCode",{parentName:"a"},"PnpHookOptions")),"<",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ODataQueryableCollection"},(0,o.kt)("inlineCode",{parentName:"a"},"ODataQueryableCollection")),">"),(0,o.kt)("p",{parentName:"li"},"\u21b3 ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("inlineCode",{parentName:"strong"},"FoldersOptions"))))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"behaviors"},"behaviors"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"behaviors"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"TimelinePipe"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"any"),">","[]"),(0,o.kt)("p",null,"Additional behaviors for hooks PnP request."),(0,o.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#behaviors"},"behaviors")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"disabled"},"disabled"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"disabled"),": ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/DisableOptionType#disableoptionvaluetype"},(0,o.kt)("inlineCode",{parentName:"a"},"DisableOptionValueType"))," ","|"," () => ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Disable hook calls and renders."),(0,o.kt)("h4",{id:"overrides"},"Overrides"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#disabled"},"disabled")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"error"},"error"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"error"),": ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/ErrorFunc#errorfunc"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,o.kt)("p",null,"Error handling. Default is ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode#default"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,o.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#error"},"error")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Keep previous state until new request is resolved rather than clearing the state as ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),". Default is ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#keeppreviousstate"},"keepPreviousState")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"query"},"query"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"query"),": ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ODataQueryableCollection"},(0,o.kt)("inlineCode",{parentName:"a"},"ODataQueryableCollection")),">"),(0,o.kt)("p",null,"OData query. ",(0,o.kt)(a.Z,{text:"Any meaningful change refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#query"},"query")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"rootfolderid"},"rootFolderId"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"rootFolderId"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("p",null,"Root folder GUID Id or server relative path. ",(0,o.kt)(a.Z,{text:"Changing root folder refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"sp"},"sp"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"sp"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,o.kt)("p",null,"Pnp SP context. ",(0,o.kt)(a.Z,{text:"Changing sp value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#sp"},"sp")))}c.isMDXComponent=!0}}]);