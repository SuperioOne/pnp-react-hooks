"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[6842],{9613:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(9496);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),s=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(o.Provider,{value:t},e.children)},m="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),m=s(a),f=r,u=m["".concat(o,".").concat(f)]||m[f]||k[f]||l;return a?n.createElement(u,i(i({ref:t},d),{},{components:a})):n.createElement(u,i({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=f;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[m]="string"==typeof e?e:r,i[1]=p;for(var s=2;s<l;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}f.displayName="MDXCreateElement"},8532:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(9496);const r={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function l(e){return n.createElement("div",{className:r.tooltip},n.createElement("span",{className:r.tooltiptext},e.text),e.children)}},7153:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>f,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=a(1163),r=(a(9496),a(9613)),l=a(8532);const i={toc_min_heading_level:2,toc_max_heading_level:4},p=void 0,o={unversionedId:"API/Sp/useFile",id:"API/Sp/useFile",title:"useFile",description:"Definition",source:"@site/docs/API/Sp/useFile.md",sourceDirName:"API/Sp",slug:"/API/Sp/useFile",permalink:"/pnp-react-hooks/API/Sp/useFile",draft:!1,tags:[],version:"current",frontMatter:{toc_min_heading_level:2,toc_max_heading_level:4},sidebar:"tutorialSidebar",previous:{title:"useFields",permalink:"/pnp-react-hooks/API/Sp/useFields"},next:{title:"useFiles",permalink:"/pnp-react-hooks/API/Sp/useFiles"}},s={},d=[{value:"Definition",id:"definition",level:2},{value:"Overloads",id:"overloads",level:2},{value:"useFile <code>IFileInfo</code>",id:"usefile-ifileinfo",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Examples",id:"examples",level:4},{value:"useFile <code>Blob</code>",id:"usefile-blob",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Examples",id:"examples-1",level:4},{value:"useFile <code>ArrayBuffer</code>",id:"usefile-arraybuffer",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Examples",id:"examples-2",level:4},{value:"useFile <code>string</code>",id:"usefile-string",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Examples",id:"examples-3",level:4}],m={toc:d},k="wrapper";function f(e){let{components:t,...a}=e;return(0,r.kt)(k,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"definition"},"Definition"),(0,r.kt)("p",null,"Returns a file from file collection."),(0,r.kt)("h2",{id:"overloads"},"Overloads"),(0,r.kt)("h3",{id:"usefile-ifileinfo"},"useFile ",(0,r.kt)("inlineCode",{parentName:"h3"},"IFileInfo")),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useFile"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"fileId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"IFileInfo"),">"),(0,r.kt)("p",null,"Returns a file from file collection."),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fileId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"File GUID Id or server relative path. ",(0,r.kt)(l.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/FileInfoOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"FileInfoOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useFile refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"IFileInfo"),">"),(0,r.kt)("h4",{id:"examples"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'// get file by Id\nconst fileInfo = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7");\n\n// get file by server relative path\nconst assetInfo = useFile("/sites/mysite/SiteAssets/example.png");\n')),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"usefile-blob"},"useFile ",(0,r.kt)("inlineCode",{parentName:"h3"},"Blob")),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useFile"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"fileId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Blob"),">"),(0,r.kt)("p",null,"Returns file content as ",(0,r.kt)("inlineCode",{parentName:"p"},"Blob"),"."),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fileId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"File GUID Id or server relative path. ",(0,r.kt)(l.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/FileBlobOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"FileBlobOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useFile refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Blob"),">"),(0,r.kt)("h4",{id:"examples-1"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const fileContentAsBlob = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    type: "blob"\n});\n')),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"usefile-arraybuffer"},"useFile ",(0,r.kt)("inlineCode",{parentName:"h3"},"ArrayBuffer")),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useFile"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"fileId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"ArrayBuffer"),">"),(0,r.kt)("p",null,"Returns file content as {@link ArrayBuffer}."),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fileId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"File GUID Id or server relative path. ",(0,r.kt)(l.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/FileBufferOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"FileBufferOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useFile refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"ArrayBuffer"),">"),(0,r.kt)("h4",{id:"examples-2"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const fileContentAsBuffer = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    type: "buffer"\n});\n')),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"usefile-string"},"useFile ",(0,r.kt)("inlineCode",{parentName:"h3"},"string")),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useFile"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"fileId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,r.kt)("p",null,"Returns file content as text."),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fileId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:"left"},"File GUID Id or server relative path. ",(0,r.kt)(l.Z,{text:"Changing the value refreshes response data.",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/FileTextOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"FileTextOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useFile refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,r.kt)("h4",{id:"examples-3"},"Examples"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const fileContentAsText = useFile("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    type: "text"\n});\n')))}f.isMDXComponent=!0}}]);