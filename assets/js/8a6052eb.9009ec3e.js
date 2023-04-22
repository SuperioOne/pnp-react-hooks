"use strict";(self.webpackChunkpnp_react_hooks_docs=self.webpackChunkpnp_react_hooks_docs||[]).push([[7063],{9613:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var r=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,h=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[m]="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9659:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var r=n(1163),o=(n(9496),n(9613));const a={sidebar_position:2,title:"Getting Started"},i="Getting Started",p={unversionedId:"GettingStarted",id:"GettingStarted",title:"Getting Started",description:"SPFx",source:"@site/docs/GettingStarted.md",sourceDirName:".",slug:"/GettingStarted",permalink:"/pnp-react-hooks/GettingStarted",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Getting Started"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/pnp-react-hooks/"},next:{title:"API",permalink:"/pnp-react-hooks/API/"}},s={},l=[{value:"SPFx",id:"spfx",level:2}],c={toc:l},m="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("h2",{id:"spfx"},"SPFx"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Install ",(0,o.kt)("inlineCode",{parentName:"li"},"pnp-react-hooks")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"@pnp/sp")," packages to your ",(0,o.kt)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview"},"SPFx")," webpart project.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"npm install pnp-react-hooks @pnp/sp\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Update module imports, ",(0,o.kt)("inlineCode",{parentName:"li"},"onInit()")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"render()")," functions on ",(0,o.kt)("inlineCode",{parentName:"li"},"<YourWebpartName>.tsx")," file.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"PnpReactHookExamplesWebPart.ts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript",metastring:"showLineNumbers",showLineNumbers:!0},"// <Other Webpart imports>\n// Import pnp-react-hooks helper function and option type\n// highlight-next-line\nimport { PnpHookGlobalOptions, createProviderElement } from 'pnp-react-hooks';\n// import PnPjs\n// highlight-next-line\nimport { spfi, SPFx} from '@pnp/sp';\n\nexport default class PnpReactHookExamplesWebPart extends BaseClientSideWebPart<IPnpReactHookExamplesWebPartProps>\n{\n  private _isDarkTheme: boolean = false;\n  private _environmentMessage: string = '';\n  private _theme: IReadonlyTheme;\n  // highlight-next-line\n  private _hookOptions: PnpHookGlobalOptions;\n\n  // Create onInit function to initialize options.\n  protected onInit(): Promise<void>\n  {\n    return this._getEnvironmentMessage().then(message =>\n    {\n      this._environmentMessage = message;\n        // Initialize PnPjs sp context.\n      // highlight-next-line\n      const sp = spfi().using(SPFx(this.context));\n\n      // Setup your default PnP React hooks options.\n      // highlight-start\n      this._hookOptions = {\n        sp: sp,\n        disabled: \"auto\"\n      };\n     // highlight-end\n    });\n  }\n\n  public render(): void\n  {\n    const element: React.ReactElement<IPnpReactHookExamplesProps> = React.createElement(\n      PnpReactHookExamples,\n      {\n        description: this.properties.description,\n      }\n    );\n\n    // Use helper function to create React elements.\n    // highlight-next-line\n    const rootElement = createProviderElement(this._hookOptions, element);\n\n    // Render root element.\n    // highlight-next-line\n    ReactDom.render(rootElement, this.domElement);\n  }\n\n}\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Start using hooks in your webpart components.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"PnpReactHookExamples.tsx")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport { IPnpReactHookExamplesProps } from './IPnpReactHookExamplesProps';\nimport { useCurrentUser } from \"pnp-react-hooks\";\n\nconst PnpReactHookExamples = (props: IPnpReactHookExamplesProps) =>\n{\n    const me = useCurrentUser({\n        query: {\n            select: [\"Title\"]\n        }\n    });\n\n    return (\n        <div>{me?.Title}</div>\n    );\n};\n\nexport default PnpReactHookExamples;\n")))}u.isMDXComponent=!0}}]);