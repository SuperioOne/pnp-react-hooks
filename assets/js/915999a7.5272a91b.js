"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[3515],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return k}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=s(n),k=a,f=d["".concat(l,".").concat(k)]||d[k]||c[k]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(7294),a="tooltip_Oc7l",o="tooltiptext_weba";function i(e){return r.createElement("div",{className:a},r.createElement("span",{className:o},e.text),e.children)}},7880:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=n(5653),p=["components"],l={},s=void 0,u={unversionedId:"API/Interfaces/FileTextOptions",id:"API/Interfaces/FileTextOptions",title:"FileTextOptions",description:"Properties",source:"@site/pnp-react-hooks/docs/API/Interfaces/FileTextOptions.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/FileTextOptions",permalink:"/pnp-react-hooks/API/Interfaces/FileTextOptions",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"FileInfoOptions",permalink:"/pnp-react-hooks/API/Interfaces/FileInfoOptions"},next:{title:"FilesOptions",permalink:"/pnp-react-hooks/API/Interfaces/FilesOptions"}},c={},d=[{value:"Properties",id:"properties",level:2},{value:"behaviors",id:"behaviors",level:3},{value:"disabled",id:"disabled",level:3},{value:"error",id:"error",level:3},{value:"keepPreviousState",id:"keeppreviousstate",level:3},{value:"sp",id:"sp",level:3},{value:"type",id:"type",level:3}],k={toc:d};function f(e){var t=e.components,n=(0,a.Z)(e,p);return(0,o.kt)("wrapper",(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"behaviors"},"behaviors"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"behaviors"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"TimelinePipe"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"any"),">","[]"),(0,o.kt)("p",null,"Additional behaviors for hooks PnP request."),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"disabled"},"disabled"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"disabled"),": ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/DisableOptionType#disableoptionvaluetype"},(0,o.kt)("inlineCode",{parentName:"a"},"DisableOptionValueType"))," ","|"," (",(0,o.kt)("inlineCode",{parentName:"p"},"fileId"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),") => ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Disable hook calls and renders."),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"error"},"error"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"error"),": ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/ErrorFunc#errorfunc"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorFunc"))," ","|"," ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode"))),(0,o.kt)("p",null,"Error handling. Default is ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Enums/ErrorMode#default"},(0,o.kt)("inlineCode",{parentName:"a"},"ErrorMode.Default")),"."),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"keeppreviousstate"},"keepPreviousState"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"keepPreviousState"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"boolean")),(0,o.kt)("p",null,"Keep previous state until new request resolves rather than clearing the state as ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),". Default is ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"sp"},"sp"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"sp"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"SPFI")),(0,o.kt)("p",null,"Pnp SP context. ",(0,o.kt)(i.Z,{text:"Changing sp value repeats request",mdxType:"ToolTip"},"\ud83d\udea9")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"type"},"type"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"type"),": ",(0,o.kt)("inlineCode",{parentName:"p"},'"text"')),(0,o.kt)("p",null,"Request type. ",(0,o.kt)(i.Z,{text:"Changing the type repeats request",mdxType:"ToolTip"},"\ud83d\udea9")))}f.isMDXComponent=!0}}]);