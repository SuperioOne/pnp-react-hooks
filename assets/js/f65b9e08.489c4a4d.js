"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[4317],{9613:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>f});var a=t(9496);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=a.createContext({}),l=function(e){var r=a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=l(e.components);return a.createElement(p.Provider,{value:r},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(t),u=n,f=d["".concat(p,".").concat(u)]||d[u]||m[u]||o;return t?a.createElement(f,i(i({ref:r},c),{},{components:t})):a.createElement(f,i({ref:r},c))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=u;var s={};for(var p in r)hasOwnProperty.call(r,p)&&(s[p]=r[p]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1371:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=t(1163),n=(t(9496),t(9613));const o={},i=void 0,s={unversionedId:"API/Interfaces/RenderListParameters",id:"API/Interfaces/RenderListParameters",title:"RenderListParameters",description:"Properties",source:"@site/docs/API/Interfaces/RenderListParameters.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/RenderListParameters",permalink:"/pnp-react-hooks/API/Interfaces/RenderListParameters",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"RegionalSettingOptions",permalink:"/pnp-react-hooks/API/Interfaces/RegionalSettingOptions"},next:{title:"RenderOptions",permalink:"/pnp-react-hooks/API/Interfaces/RenderOptions"}},p={},l=[{value:"Properties",id:"properties",level:2},{value:"dataParameters",id:"dataparameters",level:3},{value:"dataOverrideParameters",id:"dataoverrideparameters",level:3},{value:"useQueryParameters",id:"usequeryparameters",level:3}],c={toc:l},d="wrapper";function m(e){let{components:r,...t}=e;return(0,n.kt)(d,(0,a.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("h3",{id:"dataparameters"},"dataParameters"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"dataParameters"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"IRenderListDataParameters")),(0,n.kt)("p",null,"Render as stream data parameters. For parameter details ",(0,n.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/dotnet/api/microsoft.sharepoint.client.renderlistdataparameters?view=sharepoint-csom"},"see official docs"),"."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"dataoverrideparameters"},"dataOverrideParameters"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"dataOverrideParameters"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"RenderListDataOverrideParameters")),(0,n.kt)("p",null,"Render as stream override parameters. For parameters details ",(0,n.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/dotnet/api/microsoft.sharepoint.client.renderlistdataoverrideparameters?view=sharepoint-csom"},"see official docs"),"."),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"usequeryparameters"},"useQueryParameters"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"useQueryParameters"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"boolean")),(0,n.kt)("p",null,"Include override parameters in query string when value is ",(0,n.kt)("inlineCode",{parentName:"p"},"true"),". If ",(0,n.kt)("inlineCode",{parentName:"p"},"false")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"undefined"),", parameters are included in request body."))}m.isMDXComponent=!0}}]);