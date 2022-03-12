"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[5154],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8149:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return c}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),l=["components"],i={},p=void 0,u={unversionedId:"API/Interfaces/SpSearchResult",id:"API/Interfaces/SpSearchResult",title:"SpSearchResult",description:"Properties",source:"@site/pnp-react-hooks/docs/API/Interfaces/SpSearchResult.md",sourceDirName:"API/Interfaces",slug:"/API/Interfaces/SpSearchResult",permalink:"/pnp-react-hooks/API/Interfaces/SpSearchResult",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SiteUsersOptions",permalink:"/pnp-react-hooks/API/Interfaces/SiteUsersOptions"},next:{title:"SubWebsOptions",permalink:"/pnp-react-hooks/API/Interfaces/SubWebsOptions"}},s={},c=[{value:"Properties",id:"properties",level:2},{value:"CurrentPage",id:"currentpage",level:3},{value:"ElapsedTime",id:"elapsedtime",level:3},{value:"PrimarySearchResults",id:"primarysearchresults",level:3},{value:"RawSearchResults",id:"rawsearchresults",level:3},{value:"RowCount",id:"rowcount",level:3},{value:"TotalRows",id:"totalrows",level:3},{value:"TotalRowsIncludingDuplicates",id:"totalrowsincludingduplicates",level:3}],d={toc:c};function m(e){var t=e.components,r=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"currentpage"},"CurrentPage"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"CurrentPage"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"elapsedtime"},"ElapsedTime"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"ElapsedTime"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"primarysearchresults"},"PrimarySearchResults"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"PrimarySearchResults"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"ISearchResult"),"[]"),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"rawsearchresults"},"RawSearchResults"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"RawSearchResults"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"ISearchResponse")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"rowcount"},"RowCount"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"RowCount"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"totalrows"},"TotalRows"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"TotalRows"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"totalrowsincludingduplicates"},"TotalRowsIncludingDuplicates"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"TotalRowsIncludingDuplicates"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")))}m.isMDXComponent=!0}}]);