"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[9507],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,k=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(k,p(p({ref:t},c),{},{components:n})):r.createElement(k,p({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:a,p[1]=i;for(var s=2;s<o;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5653:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(7294);const a={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function o(e){return r.createElement("div",{className:a.tooltip},r.createElement("span",{className:a.tooltiptext},e.text),e.children)}},2240:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>p,metadata:()=>l,toc:()=>c});var r=n(7462),a=(n(7294),n(3905)),o=n(5653);const p={},i=void 0,l={unversionedId:"API/Interfaces/AttachmentBlobOptions",id:"API/Interfaces/AttachmentBlobOptions",title:"AttachmentBlobOptions",description:"Properties",source:"@site/docs/API/Interfaces/AttachmentBlobOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/AttachmentBlobOptions",permalink:"/pnp-react-hooks/API/Interfaces/AttachmentBlobOptions",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AllItemsOptions",permalink:"/pnp-react-hooks/API/Interfaces/AllItemsOptions"},next:{title:"AttachmentBufferOptions",permalink:"/pnp-react-hooks/API/Interfaces/AttachmentBufferOptions"}},s={},c=[{value:"Properties",id:"properties",level:2},{value:"behaviors",id:"behaviors",level:3},{value:"disabled",id:"disabled",level:3},{value:"error",id:"error",level:3},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"sp",id:"sp",level:3},{value:"type",id:"type",level:3}],u={toc:c},d="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"behaviors"},"behaviors"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"behaviors"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"TimelinePipe"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"any"),">","[]"),(0,a.kt)("p",null,"Additional behaviors for hooks PnP request."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"disabled"},"disabled"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"disabled"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/DisableOptionType#disableoptionvaluetype"},(0,a.kt)("inlineCode",{parentName:"a"},"DisableOptionValueType"))," ","|"," (",(0,a.kt)("inlineCode",{parentName:"p"},"attachmentName"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"itemId"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"list"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),") => ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("p",null,"Disable hook calls and renders."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"error"},"error"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"error"),": ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/ErrorFunc#errorfunc"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,a.kt)("p",null,"Error handling. Default is ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode#default"},(0,a.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("p",null,"Keep previous state until new request is resolved rather than clearing the state as ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),". Default is ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sp"},"sp"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"sp"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,a.kt)("p",null,"Pnp SP context. ",(0,a.kt)(o.Z,{text:"Changing sp value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"type"},"type"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"type"),": ",(0,a.kt)("inlineCode",{parentName:"p"},'"blob"')),(0,a.kt)("p",null,"Request type. ",(0,a.kt)(o.Z,{text:"Changing the type refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9")))}m.isMDXComponent=!0}}]);