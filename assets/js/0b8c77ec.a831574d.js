"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[8376],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=s(n),f=a,m=d["".concat(p,".").concat(f)]||d[f]||c[f]||l;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(7294),a="tooltip_Oc7l",l="tooltiptext_weba";function i(e){return r.createElement("div",{className:a},r.createElement("span",{className:l},e.text),e.children)}},863:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return d}});var r=n(7462),a=n(3366),l=(n(7294),n(3905)),i=n(5653),o=["components"],p={},s=void 0,u={unversionedId:"API/Sp/useFiles",id:"API/Sp/useFiles",title:"useFiles",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useFiles.md",sourceDirName:"API/Sp",slug:"/API/Sp/useFiles",permalink:"/API/Sp/useFiles",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useFile",permalink:"/API/Sp/useFile"},next:{title:"useFolder",permalink:"/API/Sp/useFolder"}},c={},d=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],f={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"definition"},"Definition"),(0,l.kt)("p",null,"\u25b8 ",(0,l.kt)("strong",{parentName:"p"},"useFiles"),"(",(0,l.kt)("inlineCode",{parentName:"p"},"folderId"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,l.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,l.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,l.kt)("inlineCode",{parentName:"p"},"IFileInfo"),"[]",">"),(0,l.kt)("p",null,"Returns file collection from folder."),(0,l.kt)("h2",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"folderId")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"string")),(0,l.kt)("td",{parentName:"tr",align:"left"},"Folder GUID Id or server relative path. ",(0,l.kt)(i.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"options?")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("a",{parentName:"td",href:"/API/Interfaces/FilesOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"FilesOptions"))),(0,l.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"deps?")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,l.kt)("td",{parentName:"tr",align:"left"},"useFiles will resend request when one of the dependencies changed.")))),(0,l.kt)("h2",{id:"returns"},"Returns"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/API/Types/NullableT"},(0,l.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,l.kt)("inlineCode",{parentName:"p"},"IFileInfo"),"[]",">"),(0,l.kt)("h2",{id:"examples"},"Examples"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},'// get all files from folder by folder Id\nconst files = useFiles("5ee53613-bc0f-4b2a-9904-b21afd8431a7");\n\n// get all files from folder by folder server relative url\nconst siteAssetsFiles = useFiles("/sites/mysite/SiteAssets", {\n    query: {\n        select: ["Id", "Name", "ServerRelativeUrl", "Author/Title"]\n        expand: ["Author"]\n    }\n});\n')))}m.isMDXComponent=!0}}]);