"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[4074],{3905:function(e,t,r){r.d(t,{Zo:function(){return i},kt:function(){return h}});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),c=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},i=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,s=e.originalType,l=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),m=c(r),h=n,f=m["".concat(l,".").concat(h)]||m[h]||u[h]||s;return r?o.createElement(f,a(a({ref:t},i),{},{components:r})):o.createElement(f,a({ref:t},i))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var s=r.length,a=new Array(s);a[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:n,a[1]=p;for(var c=2;c<s;c++)a[c]=r[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},5406:function(e,t,r){r.r(t),r.d(t,{assets:function(){return k},contentTitle:function(){return f},default:function(){return v},frontMatter:function(){return h},metadata:function(){return d},toc:function(){return b}});var o=r(7462),n=r(3366),s=r(7294),a=r(3905),p="videoplayer_x6WF",l="controlOff_d85P",c="controlOn_P8lF",i="playButton_j5uQ";function u(e){var t=s.useRef(),r=s.useState(!1),o=r[0],n=r[1],a=s.useCallback((function(){o?(t.current.pause(),n(!1)):(t.current.play(),n(!0))}),[o]);return s.createElement("div",{onClick:a,className:p},s.createElement("div",{className:o?l:c},s.createElement("div",{className:i},"GIF")),s.createElement("video",{ref:t,height:"auto",src:e.src,muted:!0,loop:!0}))}var m=["components"],h={sidebar_position:3,title:"Example Components"},f=void 0,d={unversionedId:"ExampleComponents",id:"ExampleComponents",title:"Example Components",description:"Example components were created using only @fluentui/react and pnp-react-hooks. You can check source code of example SPFx 1.14 project on GitHub.",source:"@site/pnp-react-hooks/docs/ExampleComponents.md",sourceDirName:".",slug:"/ExampleComponents",permalink:"/pnp-react-hooks/ExampleComponents",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Example Components"},sidebar:"tutorialSidebar",previous:{title:"Configuration",permalink:"/pnp-react-hooks/Configuration"},next:{title:"API",permalink:"/pnp-react-hooks/API/"}},k={},b=[{value:"Basic Search",id:"basic-search",level:2},{value:"Basic User Search",id:"basic-user-search",level:2},{value:"Current User Persona",id:"current-user-persona",level:2},{value:"File Explorer",id:"file-explorer",level:2},{value:"Groups And Users",id:"groups-and-users",level:2},{value:"JSON File Data",id:"json-file-data",level:2},{value:"List Items",id:"list-items",level:2},{value:"Navigation",id:"navigation",level:2},{value:"Option Provider",id:"option-provider",level:2},{value:"User Roles",id:"user-roles",level:2}],x={toc:b};function v(e){var t=e.components,r=(0,n.Z)(e,m);return(0,a.kt)("wrapper",(0,o.Z)({},x,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Example components were created using only ",(0,a.kt)("a",{parentName:"p",href:"https://developer.microsoft.com/en-us/fluentui#/"},(0,a.kt)("inlineCode",{parentName:"a"},"@fluentui/react"))," and ",(0,a.kt)("inlineCode",{parentName:"p"},"pnp-react-hooks"),". You can check source code of example SPFx 1.14 project on ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples"},"GitHub"),"."),(0,a.kt)("h2",{id:"basic-search"},"Basic Search"),(0,a.kt)("p",null,"Site search page."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/BasicSearch.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/search-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"basic-user-search"},"Basic User Search"),(0,a.kt)("p",null,"Search and display user profile."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/BasicUserSearch.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/user-search-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"current-user-persona"},"Current User Persona"),(0,a.kt)("p",null,"Loads current user's profile and creates a persona."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/CurrentUserPersona.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/user-persona-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"file-explorer"},"File Explorer"),(0,a.kt)("p",null,"Simple file explorer component to traverse files and folders with filtering."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/FileExplorer.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/file-explorer-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"groups-and-users"},"Groups And Users"),(0,a.kt)("p",null,"Displays all site groups along side with group users and shows if current user is member of selected group."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/GroupsAndUsers.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/group-and-user-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"json-file-data"},"JSON File Data"),(0,a.kt)("p",null,"Loads content and metadata of selected json file from SiteAssets folder."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/JsonFileData.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/file-read-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"list-items"},"List Items"),(0,a.kt)("p",null,"Basic list component for displaying list items."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/ListItems.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/list-items-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"navigation"},"Navigation"),(0,a.kt)("p",null,"Navigation components for both site top navigation and quickbar."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/Navigation.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/navigation-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"option-provider"},"Option Provider"),(0,a.kt)("p",null,"Shows how options affects hooks behavior."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/OptionProvider.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/options-showcase.mp4",mdxType:"GIFPlayer"}),(0,a.kt)("h2",{id:"user-roles"},"User Roles"),(0,a.kt)("p",null,"Shows the roles of current user and how roles given to user."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/SuperioOne/pnp-react-hooks-examples/blob/master/src/webparts/pnpReactHookExamples/components/ExamplesComponents/UserRoles.tsx"},"Source file")),(0,a.kt)(u,{src:"/pnp-react-hooks/showcases/user-role-showcase.mp4",mdxType:"GIFPlayer"}))}v.isMDXComponent=!0}}]);