# Option Provider

All hooks can be configured with `PnpHookOptionProvider` component. 
SP Hooks use options from the nearest parent provider similar to how React contexts works.

```javascript
import * as React from "react";
import { useWebInfo, PnpHookOptionProvider, PnpHookGlobalOptions } from "pnp-react-hooks";
import { Caching } from "@pnp/queryable";
import { spfi, SPBrowser } from "@pnp/sp";

/** @type{PnpHookGlobalOptions} **/
const options = {
    disabled: "auto",
    keepPreviousState: true,
    error: console.debug,
    sp: spfi().using(SPBrowser())
};

/** @type{PnpHookGlobalOptions} **/
const cachedOptions = {
    disabled: "auto",
    keepPreviousState: true,
    error: console.debug,
    sp: spfi().using(SPBrowser(), Caching())
};

export function Main() {
    return(
        <>
            <PnpHookOptionProvider value={options}>
                <CurrentWebInfo />
                <UserInfo />
            </PnpHookOptionProvider>
            <PnpHookOptionProvider value={cachedOptions}>
                <CurrentWebInfo />
                <UserInfo />
            </PnpHookOptionProvider>
        </>
    );
}

export function CurrentWebInfo() {
    const web = useWebInfo();
    return <h1>{web?.Title}</h1>;
}

export function UserInfo() {
    const user = useCurrentUser();
    return <h2>{user?.Title}</h2>;
}
```

For non-Jsx initializers, `PnpHookOptionProvider` can be created with `createProviderElement` function.

```typescript
createProviderElement(options: PnpHOokGlobalOptions, ...children: any[]);
```

```javascript
import * as React from "react";
import * as ReactDom from "react-dom";
import { spfi, SPBrowser } from "@pnp/sp";
import { createProviderElement, PnpHookGlobalOptions } from 'pnp-react-hooks';

// create options
const options: PnpHookGlobalOptions = {
    sp: spfi("<sharepoint-site-url>").using(SPBrowser()),
    disabled: "auto",
    error: (err) => console.debug(err)
};

// Create your child elements
const childElement0 = React.createElement(PnpReactHookExamples, { description: "Child 0" });
const childElement1 = React.createElement(PnpReactHookExamples, { description: "Child 1" });

// Create root element with provider
const rootElement = createProviderElement(options, childElement0, childElement1);

ReactDom.render(rootElement, this.domElement);
```

Created React DOM tree is:
```jsx
<PnpHookOptionProvider value={options}>
    <PnpReactHookExamples description="Child 0" />
    <PnpReactHookExamples description="Child 1" />
</PnpHookOptionProvider>
```

