"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[5364],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(n),f=a,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||o;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1027:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={slug:"v1.0.0",title:"v1.0.0 - Initial release",authors:["superior"],tags:["pnp-react-hooks","v1"]},c=void 0,s={permalink:"/pnp-react-hooks/changelog/v1.0.0",source:"@site/changelog/2022-03-09-v1.0.0.md",title:"v1.0.0 - Initial release",description:"What's In",date:"2022-03-09T00:00:00.000Z",formattedDate:"March 9, 2022",tags:[{label:"pnp-react-hooks",permalink:"/pnp-react-hooks/changelog/tags/pnp-react-hooks"},{label:"v1",permalink:"/pnp-react-hooks/changelog/tags/v-1"}],truncated:!1,authors:[{name:"SuperiorOne",title:"Maintainer",url:"https://github.com/SuperioOne",key:"superior"}],frontMatter:{slug:"v1.0.0",title:"v1.0.0 - Initial release",authors:["superior"],tags:["pnp-react-hooks","v1"]},prevItem:{title:"v1.0.1 - Search patch",permalink:"/pnp-react-hooks/changelog/v1.0.1"}},p={authorsImageUrls:[void 0]},u=[{value:"What&#39;s In",id:"whats-in",level:2},{value:"What&#39;s planned for future release",id:"whats-planned-for-future-release",level:2}],m={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"whats-in"},"What's In"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"42 new custom hook for accessing SharePoint contents."),(0,o.kt)("li",{parentName:"ul"},"PnPjs v3 upgrade. ",(0,o.kt)("em",{parentName:"li"},"v2 support dropped before major release.")),(0,o.kt)("li",{parentName:"ul"},"Configuration system based on React Context API."),(0,o.kt)("li",{parentName:"ul"},"Helper hook function for accessing options.")),(0,o.kt)("h2",{id:"whats-planned-for-future-release"},"What's planned for future release"),(0,o.kt)("ul",{className:"contains-task-list"},(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Paged mode for ",(0,o.kt)("inlineCode",{parentName:"li"},"useListItems")," hook."),(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Auto request cancellation with ",(0,o.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal"},(0,o.kt)("inlineCode",{parentName:"a"},"AbortSignal")),". Currently observers cancels execution but fetch request continues on background."),(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Adding a ",(0,o.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/sharepoint/dev/spfx/subscribe-to-list-notifications"},(0,o.kt)("em",{parentName:"a"},"subscription"))," base hook function similar to React's ",(0,o.kt)("inlineCode",{parentName:"li"},"useEffect")," to execute custom action when list content updated."),(0,o.kt)("li",{parentName:"ul",className:"task-list-item"},(0,o.kt)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ","Recursive option for ",(0,o.kt)("inlineCode",{parentName:"li"},"useFiles"),".")))}f.isMDXComponent=!0}}]);