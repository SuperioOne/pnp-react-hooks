"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[8479],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=p(n),g=a,h=f["".concat(l,".").concat(g)]||f[g]||s[g]||o;return n?r.createElement(h,c(c({ref:t},u),{},{components:n})):r.createElement(h,c({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var p=2;p<o;p++)c[p]=n[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8920:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return g},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return s}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),c=["components"],i={slug:"v1.0.1",title:"v1.0.1 - Search patch",authors:["superior"],tags:["pnp-react-hooks","v1"]},l=void 0,p={permalink:"/pnp-react-hooks/changelog/v1.0.1",source:"@site/changelog/2022-03-11-v1.0.1.md",title:"v1.0.1 - Search patch",description:"Changelog",date:"2022-03-11T00:00:00.000Z",formattedDate:"March 11, 2022",tags:[{label:"pnp-react-hooks",permalink:"/pnp-react-hooks/changelog/tags/pnp-react-hooks"},{label:"v1",permalink:"/pnp-react-hooks/changelog/tags/v-1"}],truncated:!1,authors:[{name:"SuperiorOne",title:"Maintainer",url:"https://github.com/SuperioOne",key:"superior"}],frontMatter:{slug:"v1.0.1",title:"v1.0.1 - Search patch",authors:["superior"],tags:["pnp-react-hooks","v1"]},nextItem:{title:"v1.0.0 - Initial release",permalink:"/pnp-react-hooks/changelog/v1.0.0"}},u={authorsImageUrls:[void 0]},s=[{value:"Changelog",id:"changelog",level:2},{value:"Sp",id:"sp",level:3},{value:"Dependencies",id:"dependencies",level:3}],f={toc:s};function g(e){var t=e.components,n=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"changelog"},"Changelog"),(0,o.kt)("h3",{id:"sp"},"Sp"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Fixed:")," useSearch was failing when getPageDispatch was called more than once.")),(0,o.kt)("h3",{id:"dependencies"},"Dependencies"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Updated:")," All dependencies are updated to the latest version and tested for any breaking changes.")))}g.isMDXComponent=!0}}]);