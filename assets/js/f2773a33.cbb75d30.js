"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[7735],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(r),f=o,m=u["".concat(s,".").concat(f)]||u[f]||c[f]||a;return r?n.createElement(m,l(l({ref:t},d),{},{components:r})):n.createElement(m,l({ref:t},d))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},3641:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return c}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),l=["components"],i={},s=void 0,p={unversionedId:"API/Sp/useFolders",id:"API/Sp/useFolders",title:"useFolders",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useFolders.md",sourceDirName:"API/Sp",slug:"/API/Sp/useFolders",permalink:"/pnp-react-hooks/API/Sp/useFolders",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useFolderTree",permalink:"/pnp-react-hooks/API/Sp/useFolderTree"},next:{title:"useGroup",permalink:"/pnp-react-hooks/API/Sp/useGroup"}},d={},c=[{value:"Definition",id:"definition",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Examples",id:"examples",level:2}],u={toc:c};function f(e){var t=e.components,r=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"definition"},"Definition"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"useFolders"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,a.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,a.kt)("inlineCode",{parentName:"p"},"IFolderInfo"),"[]",">"),(0,a.kt)("p",null,"Returns folders from root. Use ",(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/FoldersOptions#rootfolderid"},(0,a.kt)("inlineCode",{parentName:"a"},"FoldersOptions.rootFolderId"))," property to change root."),(0,a.kt)("h2",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"options?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/FoldersOptions"},(0,a.kt)("inlineCode",{parentName:"a"},"FoldersOptions"))),(0,a.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"deps?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,a.kt)("td",{parentName:"tr",align:"left"},"useFolders will resend request when one of the dependencies changed.")))),(0,a.kt)("h2",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,a.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,a.kt)("inlineCode",{parentName:"p"},"IFolderInfo"),"[]",">"),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// get folders from web\'s root folder\nconst rootFolders = useFolders();\n\n// get folders from specific folder\nconst folders = useFolders({\n    rootFolderId: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"\n});\n\n// get folders from specific folder\nconst siteAssetsFolders = useFolders({\n    rootFolderId: "/sites/mysite/SiteAssets"\n});\n\n// get folders from specific folder\nconst filteredFolders = useFolders({\n    rootFolderId: "/sites/mysite/SiteAssets",\n    query:{\n        select: ["Id", "Title"],\n        filter: "substringof(\'Test\', Title) eq true"\n    }\n});\n')))}f.isMDXComponent=!0}}]);