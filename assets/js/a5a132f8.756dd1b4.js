"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[1931],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,k=c["".concat(l,".").concat(m)]||c[m]||d[m]||o;return n?a.createElement(k,i(i({ref:t},u),{},{components:n})):a.createElement(k,i({ref:t},u))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[c]="string"==typeof e?e:r,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8532:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9496);const r={tooltip:"tooltip_Oc7l",tooltiptext:"tooltiptext_weba"};function o(e){return a.createElement("div",{className:r.tooltip},a.createElement("span",{className:r.tooltiptext},e.text),e.children)}},7030:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var a=n(1163),r=(n(9496),n(9613)),o=n(8532);const i={},p=void 0,l={unversionedId:"API/Sp/useChanges",id:"API/Sp/useChanges",title:"useChanges",description:"Definition",source:"@site/docs/API/Sp/useChanges.md",sourceDirName:"API/Sp",slug:"/API/Sp/useChanges",permalink:"/pnp-react-hooks/API/Sp/useChanges",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useAttachments",permalink:"/pnp-react-hooks/API/Sp/useAttachments"},next:{title:"useContentTypes",permalink:"/pnp-react-hooks/API/Sp/useContentTypes"}},s={},u=[{value:"Definition",id:"definition",level:2},{value:"Type parameters",id:"type-parameters",level:3},{value:"Parameters",id:"parameters",level:3},{value:"Returns",id:"returns",level:3},{value:"Examples",id:"examples",level:3}],c={toc:u},d="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"definition"},"Definition"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"useChanges"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,r.kt)("inlineCode",{parentName:"p"},"changeQuery"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"deps?"),"): ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,r.kt)("p",null,"Returns web or list change collection. Use ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Interfaces/ChangesOptions#list"},(0,r.kt)("inlineCode",{parentName:"a"},"ChangesOptions.list"))," property\nto get list changes instead of web changes."),(0,r.kt)("h3",{id:"type-parameters"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T"))))),(0,r.kt)("h3",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"changeQuery")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"IChangeQuery")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Change query. ",(0,r.kt)(o.Z,{text:"Hook refreshes response data. if shallow comparison returns false",mdxType:"ToolTip"},"\ud83d\udea9"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/pnp-react-hooks/API/Interfaces/ChangesOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"ChangesOptions"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"PnP hook options")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"deps?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"DependencyList")),(0,r.kt)("td",{parentName:"tr",align:"left"},"useChanges refreshes response data when one of the dependencies changes.")))),(0,r.kt)("h3",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/Types/NullableT"},(0,r.kt)("inlineCode",{parentName:"a"},"Nullable")),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[]",">"),(0,r.kt)("p",null,"Changes info array."),(0,r.kt)("h3",{id:"examples"},"Examples"),(0,r.kt)("admonition",{type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"Be cautious when using ",(0,r.kt)("inlineCode",{parentName:"p"},"ChangeTokenEnd")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ChangeTokenStart")," query options. Token values are wrapped in an object and can result infinite rendering loop due to shallow comparison. Make sure token objects are not changing on every render.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const [myQuery, setQuery] = useState({\n    Add:true,\n    Alert:true,\n    // make sure token references are not changing every render.\n    ChangeTokenEnd: { StringValue: "some end token string" },\n    ChangeTokenStart: { StringValue: "some start token string" }\n});\n\nconst webChanges = useChanges(myQuery);\n\n// It\'s safe to use directly when you only use boolean query values.\nconst webChanges = useChanges({\n    Add:true,\n    Alert:true,\n    GroupMembershipDelete:true\n});\n\nconst listChangeQuery = {\n    Add:true,\n    Update:true,\n    Delete:true\n};\n\n// getting list changes by list title\nconst listChanges = useChanges(listChangeQuery, {\n    list: "My List Title"\n});\n\n// getting list changes by list Id\nconst anotherListChanges = useChanges(listChangeQuery, {\n    list: "61ca5ff8-f553-4d51-a761-89225b069a4f"\n});\n')))}m.isMDXComponent=!0}}]);