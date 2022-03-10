"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[5752],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=c(r),d=o,m=f["".concat(p,".").concat(d)]||f[d]||s[d]||l;return r?n.createElement(m,a(a({ref:t},u),{},{components:r})):n.createElement(m,a({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,a=new Array(l);a[0]=f;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var c=2;c<l;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1173:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return s}});var n=r(7462),o=r(3366),l=(r(7294),r(3905)),a=["components"],i={},p=void 0,c={unversionedId:"API/Interfaces/TreeContext",id:"API/Interfaces/TreeContext",title:"TreeContext",description:"Properties",source:"@site/pnp-react-hooks/docs/API/Interfaces/TreeContext.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/TreeContext",permalink:"/API/Interfaces/TreeContext",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Timings",permalink:"/API/Interfaces/Timings"},next:{title:"UserOptions",permalink:"/API/Interfaces/UserOptions"}},u={},s=[{value:"Properties",id:"properties",level:2},{value:"files",id:"files",level:3},{value:"folders",id:"folders",level:3},{value:"home",id:"home",level:3},{value:"root",id:"root",level:3},{value:"up",id:"up",level:3}],f={toc:s};function d(e){var t=e.components,r=(0,o.Z)(e,a);return(0,l.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)("h3",{id:"files"},"files"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"files"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"IFileInfo"),"[]"),(0,l.kt)("p",null,"File info collection for the current folder."),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"folders"},"folders"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"folders"),": ",(0,l.kt)("a",{parentName:"p",href:"/API/Interfaces/IFolderNode"},(0,l.kt)("inlineCode",{parentName:"a"},"IFolderNode")),"[]"),(0,l.kt)("p",null,"Folder info collection for the current folder."),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"home"},"home"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("strong",{parentName:"p"},"home"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"RootChangeCallback")),(0,l.kt)("p",null,"Set current path to home."),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"root"},"root"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,l.kt)("strong",{parentName:"p"},"root"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"IFolderInfo")),(0,l.kt)("p",null,"Current folder information."),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"up"},"up"),(0,l.kt)("p",null,"\u2022 ",(0,l.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,l.kt)("strong",{parentName:"p"},"up"),": ",(0,l.kt)("inlineCode",{parentName:"p"},"RootChangeCallback")),(0,l.kt)("p",null,"Set current path to the parent folder's path."))}d.isMDXComponent=!0}}]);