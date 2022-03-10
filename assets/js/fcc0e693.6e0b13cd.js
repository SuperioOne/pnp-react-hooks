"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[6518],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return c}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,k=u["".concat(s,".").concat(c)]||u[c]||d[c]||i;return n?a.createElement(k,l(l({ref:t},m),{},{components:n})):a.createElement(k,l({ref:t},m))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return l}});var a=n(7294),r="tooltip_Oc7l",i="tooltiptext_weba";function l(e){return a.createElement("div",{className:r},a.createElement("span",{className:i},e.text),e.children)}},4995:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return p},default:function(){return k},frontMatter:function(){return s},metadata:function(){return m},toc:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=n(5653),o=["components"],s={toc_min_heading_level:2,toc_max_heading_level:4},p=void 0,m={unversionedId:"API/Sp/useListItems",id:"API/Sp/useListItems",title:"useListItems",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useListItems.md",sourceDirName:"API/Sp",slug:"/API/Sp/useListItems",permalink:"/pnp-react-hooks/API/Sp/useListItems",tags:[],version:"current",frontMatter:{toc_min_heading_level:2,toc_max_heading_level:4},sidebar:"tutorialSidebar",previous:{title:"useListItem",permalink:"/pnp-react-hooks/API/Sp/useListItem"},next:{title:"useLists",permalink:"/pnp-react-hooks/API/Sp/useLists"}},d={},u=[{value:"Definition",id:"definition",level:2},{value:"Overloads",id:"overloads",level:2},{value:"useListItems <code>AllItemsOptions</code>",id:"uselistitems-allitemsoptions",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Examples",id:"examples",level:4},{value:"useListItems <code>ListItemsOptions</code>",id:"uselistitems-listitemsoptions",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Examples",id:"examples-1",level:4}],c={toc:u};function k(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"definition"},"Definition"),(0,i.kt)("p",null,"Returns all item collection from specified list."),(0,i.kt)("h2",{id:"overloads"},"Overloads"),(0,i.kt)("h3",{id:"uselistitems-allitemsoptions"},"useListItems ",(0,i.kt)("inlineCode",{parentName:"h3"},"AllItemsOptions")),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"useListItems"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"list"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,i.kt)("p",null,"Returns all item collection from specified list."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This mode allows you to fetch items over 5000 threshold but you can't use sort, top and skip query options."))),(0,i.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Return type")))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"list")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"List GUID Id or title. ",(0,i.kt)(l.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/AllItemsOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"AllItemsOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"PnP hook options for all items request.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"deps?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,i.kt)("td",{parentName:"tr",align:"left"},"useListItems will resend request when one of the dependencies changed.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,i.kt)("h4",{id:"examples"},"Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// you can provide a type (optional)\nexport interface MyItem\n{\n    Id: number;\n    Title: string;\n    Created: string;\n    Modified: string;\n    Author : {\n        Title: string;\n    }\n}\n\n// basic usage\nconst items = useListItems("My List Title", {\n    mode: ListOptions.All // 1\n});\n\n// with query and type information\nconst myItems = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    query: {\n        select: ["Title", "Id", "Author/Title", "Created", "Modified"],\n        expand: ["Author"]\n    },\n    mode: ListOptions.All // 1\n});\n')),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"uselistitems-listitemsoptions"},"useListItems ",(0,i.kt)("inlineCode",{parentName:"h3"},"ListItemsOptions")),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"useListItems"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"list"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,i.kt)("p",null,"Returns item collection from specified list."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},(0,i.kt)("inlineCode",{parentName:"p"},"useListItems")," may fail in this mode, if query result exceeds list threshold ",(0,i.kt)("em",{parentName:"p"},"(5000)"),". See ",(0,i.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint"},"MSDocs SharePoint Large Libraries")," for how to handle large libraries with indexes and filtering."))),(0,i.kt)("h4",{id:"type-parameters-1"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Return type")))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"list")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"List GUID Id or title. ",(0,i.kt)(l.Z,{text:"Changing the value repeats request",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/ListItemsOptions"},(0,i.kt)("inlineCode",{parentName:"a"},"ListItemsOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"PnP hook options.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"deps?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,i.kt)("td",{parentName:"tr",align:"left"},"useListItems will resend request when one of the dependencies changed.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,i.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,i.kt)("h4",{id:"examples-1"},"Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// you can provide a type (optional)\nexport interface MyItem\n{\n    Id: number;\n    Title: string;\n    Created: string;\n    Modified: string;\n    Author : {\n        Title: string;\n    }\n}\n\n// basic usage, \'mode\' option can be left undefined.\nconst items = useListItems("My List Title");\n\n// with query and type information\nconst myItems = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {\n    query: {\n        select: ["Title", "Id", "Author/Title", "Created", "Modified"],\n        expand: ["Author"]\n    },\n    mode: ListOptions.Default // 0\n});\n')))}k.isMDXComponent=!0}}]);