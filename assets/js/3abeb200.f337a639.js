"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[6935],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,k=d["".concat(l,".").concat(m)]||d[m]||c[m]||o;return n?a.createElement(k,i(i({ref:t},u),{},{components:n})):a.createElement(k,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(7294),r="tooltip_Oc7l",o="tooltiptext_weba";function i(e){return a.createElement("div",{className:r},a.createElement("span",{className:o},e.text),e.children)}},9132:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=n(5653),p=["components"],l={},s=void 0,u={unversionedId:"API/Sp/useChanges",id:"API/Sp/useChanges",title:"useChanges",description:"Definition",source:"@site/pnp-react-hooks/docs/API/Sp/useChanges.md",sourceDirName:"API/Sp",slug:"/API/Sp/useChanges",permalink:"/pnp-react-hooks/API/Sp/useChanges",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useAttachments",permalink:"/pnp-react-hooks/API/Sp/useAttachments"},next:{title:"useContentTypes",permalink:"/pnp-react-hooks/API/Sp/useContentTypes"}},c={},d=[{value:"Definition",id:"definition",level:2},{value:"Type parameters",id:"type-parameters",level:3},{value:"Parameters",id:"parameters",level:3},{value:"Returns",id:"returns",level:3},{value:"Examples",id:"examples",level:3}],m={toc:d};function k(e){var t=e.components,n=(0,r.Z)(e,p);return(0,o.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"definition"},"Definition"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("strong",{parentName:"p"},"useChanges"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,o.kt)("inlineCode",{parentName:"p"},"changeQuery"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,o.kt)("p",null,"Returns web or list change collection. Use ",(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ChangesOptions#list"},(0,o.kt)("inlineCode",{parentName:"a"},"ChangesOptions.list"))," property\nto get list changes instead of web changes."),(0,o.kt)("h3",{id:"type-parameters"},"Type parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"T"))))),(0,o.kt)("h3",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"changeQuery")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"IChangeQuery")),(0,o.kt)("td",{parentName:"tr",align:"left"},"Change query. ",(0,o.kt)(i.Z,{text:"Hook repeats request if shallow comparison returns false",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"options?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/ChangesOptions"},(0,o.kt)("inlineCode",{parentName:"a"},"ChangesOptions"))),(0,o.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"deps?")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,o.kt)("td",{parentName:"tr",align:"left"},"useChanges will resend request when one of the dependencies changed.")))),(0,o.kt)("h3",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,o.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,o.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,o.kt)("p",null,"Changes info array."),(0,o.kt)("h3",{id:"examples"},"Examples"),(0,o.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Be cautious when using ",(0,o.kt)("inlineCode",{parentName:"p"},"ChangeTokenEnd")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"ChangeTokenStart")," query options. Token values are wrapped in an object and can result infinite rendering loop due to shallow comparison. Make sure token objects are not changing on every render."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'const [myQuery, setQuery] = useState({\n    Add:true\n    Alert:true,\n    // make sure token references are not changing every render.\n    ChangeTokenEnd: { StringValue: "some end token string" },\n    ChangeTokenStart: { StringValue: "some start token string" }\n});\n\nconst webChanges = useChanges(myQuery);\n\n// It\'s safe to use directly when you only use boolean query values.\nconst webChanges = useChanges({\n    Add:true\n    Alert:true,\n    GroupMembershipDelete:true\n});\n\nconst listChangeQuery = {\n    Add:true\n    Update:true,\n    Delete:true\n};\n\n// getting list changes by list title\nconst listChanges = useChanges(listChangeQuery, {\n    list: "My List Title"\n});\n\n// getting list changes by list Id\nconst anotherListChanges = useChanges(listChangeQuery, {\n    list: "61ca5ff8-f553-4d51-a761-89225b069a4f"\n});\n')))}k.isMDXComponent=!0}}]);