"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[7902],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),l=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=l(e.components);return o.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(t),m=r,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return t?o.createElement(f,a(a({ref:n},c),{},{components:t})):o.createElement(f,a({ref:n},c))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=m;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[u]="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=t[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},264:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=t(7462),r=(t(7294),t(3905));const i={sidebar_position:4,title:"Advanced"},a="Advanced",s={unversionedId:"Advanced",id:"Advanced",title:"Advanced",description:"Using dependency list parameter",source:"@site/docs/Advanced.md",sourceDirName:".",slug:"/Advanced",permalink:"/pnp-react-hooks/Advanced",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Advanced"},sidebar:"tutorialSidebar",previous:{title:"usePnpHookOptions",permalink:"/pnp-react-hooks/API/usePnpHookOptions"},next:{title:"Example Components",permalink:"/pnp-react-hooks/ExampleComponents"}},p={},l=[{value:"Using dependency list parameter",id:"using-dependency-list-parameter",level:2},{value:"Behaviors",id:"behaviors",level:2},{value:"Configure for multiple sites",id:"configure-for-multiple-sites",level:2},{value:"Accessing options",id:"accessing-options",level:2}],c={toc:l},u="wrapper";function d(e){let{components:n,...i}=e;return(0,r.kt)(u,(0,o.Z)({},c,i,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"advanced"},"Advanced"),(0,r.kt)("h2",{id:"using-dependency-list-parameter"},"Using dependency list parameter"),(0,r.kt)("p",null,"All hooks supports custom dependency array similar to React's built-in hooks but unlike React, some parameters tracked internally and adding these parameters to array is not required. Hooks auto refreshes when any meaningful changes happened on parameters."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Auto tracked parameters are marked with ",(0,r.kt)("inlineCode",{parentName:"p"},"\ud83d\udea9")," symbol on the ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/"},"docs"),".")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'let title = "My List";\n\n// myList refreshes when `title` and query changes.\nconst myList = useList(title, {\n    query: {\n        select: ["Title"]\n    }\n});\n\nconst unnecessary = useList(title, {\n    query: {\n        select: ["Title"]\n    }\n}, [title]); // passing title and query is not required. They are already tracked internally.\n\nlet refresh = {};\n\nconst forcedRefresh = useList(title, {\n    query: {\n        select: ["Title"]\n    }\n}, [refresh]); // You can always force refresh with your custom variables.\n')),(0,r.kt)("h2",{id:"behaviors"},"Behaviors"),(0,r.kt)("p",null,"Hooks supports PnPJs v3 behaviors for both local and global scope."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Global")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"export default class PnpReactHookExamplesWebPart extends BaseClientSideWebPart<IPnpReactHookExamplesWebPartProps>\n{\n  private _hookOptions: PnpHookGlobalOptions;\n\n  protected onInit(): Promise<void>\n  {\n    return super.onInit().then(() =>\n    {\n      // Simply initialize spfi with your custom behaviors\n      const sp = spfi().using(SPFx(this.context), Caching(), MyCustomBehavior());\n\n      // Create global options object.\n      this._hookOptions = {\n        sp: sp\n      };\n    });\n  }\n}\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Local")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'export default function useWhoAmI()\n{\n    const user = useCurrentUser({\n        behaviors: [Caching(), MyCustomBehavior()]\n    });\n\n    // useProfile is not affected by Caching() and MyCustomBehavior()\n    const profile = useProfile(user?.LoginName, {\n        disabled: "auto"\n    });\n\n    return [user, profile];\n}\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"behaviors")," property doesn't override your global behavior configuration, it only appends behaviors to hook's inner queryable instance.")),(0,r.kt)("h2",{id:"configure-for-multiple-sites"},"Configure for multiple sites"),(0,r.kt)("p",null,"Multiple ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/PnpHookOptionProvider"},(0,r.kt)("inlineCode",{parentName:"a"},"PnpHookOptionProvider"))," can be created with different ",(0,r.kt)("inlineCode",{parentName:"p"},"spfi")," context to access multiple sites. Also, each hook function has a ",(0,r.kt)("inlineCode",{parentName:"p"},"sp")," option to override ",(0,r.kt)("inlineCode",{parentName:"p"},"spfi"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'export default function WebPart()\n{\n    // Creating different zones and configurations with PnpHookOptionProvider element.\n    return (\n    <>\n        {/* Site A */}\n        <PnpHookOptionProvider value={{sp: spfi_siteA}}>\n            <ComponentA />\n            <ComponentB />\n        </PnpHookOptionProvider>\n        {/* Site B */}\n        <PnpHookOptionProvider value={{sp: spfi_siteB, keepPreviousState: true}}>\n            <ComponentA />\n                {/* Site C */}\n                <PnpHookOptionProvider value={{sp: spfi_siteC, disabled: "auto"}}>\n                    <ComponentA />\n                    <ComponentD />\n                </PnpHookOptionProvider>);\n            <ComponentB />\n        </PnpHookOptionProvider>\n    </>);\n}\n')),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Image",src:t(8575).Z,width:"890",height:"562"})),(0,r.kt)("h2",{id:"accessing-options"},"Accessing options"),(0,r.kt)("p",null,"Hook options are accessible via ",(0,r.kt)("a",{parentName:"p",href:"/pnp-react-hooks/API/usePnpHookOptions"},(0,r.kt)("inlineCode",{parentName:"a"},"usePnpHookOptions")),". This can be useful when creating derivative of options or accessing to ",(0,r.kt)("inlineCode",{parentName:"p"},"spfi"),"."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"PnP React hooks only provides functions to read data but you can access the underlying ",(0,r.kt)("inlineCode",{parentName:"p"},"spfi")," context to interact with other PnPjs functions."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import "@pnp/sp/lists";\nimport "@pnp/sp/items";\nimport { usePnpHookOptions } from "pnp-react-hooks;\n\nfunction ExampleComponent()\n{\n    // get options from nearest parent provider.\n    const options = usePnpHookOptions();\n\n    const onClick = () =>\n    {\n        options?.sp.web.lists.getByTitle("My List").items\n            .add({ Title: "New Item" })\n            .then(console.log)\n            .error(console.error);\n    };\n\n    return (<button onClick={onClick}>Add New Item</button>);\n}\n'))))}d.isMDXComponent=!0},8575:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/content-multi-site-36a33abc8ab545be2fcb728f169c9ef6.png"}}]);