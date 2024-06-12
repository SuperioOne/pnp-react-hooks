## Definition

▸ **createProviderElement**(`contextOptions`: [`PnpHookGlobalOptions`](Interfaces/PnpHookGlobalOptions.md), ...`children`: `React.ReactNode[]`): `Element`

Helper function to create React element with [PnpHookOptionProvider](PnpHookOptionProvider.md).

## Parameters

| Name             | Type                                                         |
| :--------------- | :----------------------------------------------------------- |
| `contextOptions` | [`PnpHookGlobalOptions`](Interfaces/PnpHookGlobalOptions.md) |
| `...children`    | `React.ReactNode`                                            |

## Returns

`Element`

## Example

```tsx
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
**rootElement output:**

```tsx
<PnpHookOptionProvider value={options}>
    <PnpReactHookExamples description="Child 0" />
    <PnpReactHookExamples description="Child 1" />
</PnpHookOptionProvider>
```