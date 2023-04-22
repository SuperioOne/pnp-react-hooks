"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[7858],{9613:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>u});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},k=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,k=i(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,u=m["".concat(l,".").concat(d)]||m[d]||c[d]||o;return n?r.createElement(u,p(p({ref:t},k),{},{components:n})):r.createElement(u,p({ref:t},k))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8532:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(9496);const a={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function o(e){return r.createElement("div",{className:a.tooltip},r.createElement("span",{className:a.tooltiptext},e.text),e.children)}},513:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>k});var r=n(1163),a=(n(9496),n(9613)),o=n(8532);const p={},i=void 0,l={unversionedId:"API/Interfaces/ItemCommentsOptions",id:"API/Interfaces/ItemCommentsOptions",title:"ItemCommentsOptions",description:"Hierarchy",source:"@site/docs/API/Interfaces/ItemCommentsOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/ItemCommentsOptions",permalink:"/pnp-react-hooks/API/Interfaces/ItemCommentsOptions",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ItemAttachmentsOptions",permalink:"/pnp-react-hooks/API/Interfaces/ItemAttachmentsOptions"},next:{title:"ItemContentTypeOptions",permalink:"/pnp-react-hooks/API/Interfaces/ItemContentTypeOptions"}},s={},k=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"behaviors",id:"behaviors",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"disabled",id:"disabled",level:3},{value:"Overrides",id:"overrides",level:4},{value:"error",id:"error",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"query",id:"query",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"sp",id:"sp",level:3},{value:"Inherited from",id:"inherited-from-4",level:4}],m={toc:k},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"PnpHookOptions")),"<",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ODataQueryableCollection"},(0,a.kt)("inlineCode",{parentName:"a"},"ODataQueryableCollection")),">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"ItemCommentsOptions"))))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"behaviors"},"behaviors"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"behaviors"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"TimelinePipe"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"any"),">","[]"),(0,a.kt)("p",null,"Additional behaviors for hooks PnP request."),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#behaviors"},"behaviors")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"disabled"},"disabled"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"disabled"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/DisableOptionType#disableoptionvaluetype"},(0,a.kt)("inlineCode",{parentName:"a"},"DisableOptionValueType"))," ","|"," (",(0,a.kt)("inlineCode",{parentName:"p"},"itemId"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"list"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),") => ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("p",null,"Disable hook calls and renders."),(0,a.kt)("h4",{id:"overrides"},"Overrides"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#disabled"},"disabled")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"error"},"error"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"error"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/ErrorFunc#errorfunc"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,a.kt)("p",null,"Error handling. Default is ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode#default"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#error"},"error")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("p",null,"Keep previous state until new request is resolved rather than clearing the state as ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),". Default is ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,a.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#keeppreviousstate"},"keepPreviousState")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"query"},"query"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"query"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,a.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ODataQueryableCollection"},(0,a.kt)("inlineCode",{parentName:"a"},"ODataQueryableCollection")),">"),(0,a.kt)("p",null,"OData query. ",(0,a.kt)(o.Z,{text:"Any meaningful change refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,a.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#query"},"query")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sp"},"sp"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"sp"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,a.kt)("p",null,"Pnp SP context. ",(0,a.kt)(o.Z,{text:"Changing sp value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,a.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions"},"PnpHookOptions"),".",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/PnpHookOptions#sp"},"sp")))}d.isMDXComponent=!0}}]);