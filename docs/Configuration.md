---
sidebar_position: 2
---

# Configuration

PnP React hooks only require PnPjs `spfi` to work. You can easily configure all hooks globally with [`PnpHookOptionProvider`](API/PnPHookOptionProvider.md) component that uses React context under the hood. Each hook can be configured individually and global configuration can be overridden if needed. 

See [`PnpHookGlobalOptions`](API/Interfaces/PnpHookGlobalOptions) for all options.

## SPFx

Install pnp-react-hooks with required peer dependencies to your SPFx project and initialize `spfi` in your main entry point for the web part. 

This example shows how to initialize options with component properties.

**PnpReactHookExamplesWebPart.ts**
```typescript
// Other Webpart imports

// (optional) You can import type for type-safety.
import { PnpHookGlobalOptions } from 'pnp-react-hooks';
// import spfi
import { spfi, SPFx} from '@pnp/sp';

export interface IPnpReactHookExamplesWebPartProps
{
  description: string;
}

export default class PnpReactHookExamplesWebPart extends BaseClientSideWebPart<IPnpReactHookExamplesWebPartProps>
{
  private _hookOptions: PnpHookGlobalOptions;

  // Create onInit function to initialize options.
  protected onInit(): Promise<void>
  {
    return super.onInit().then(async (_) =>
    {
	  // Initialize sp
      const sp = spfi().using(SPFx(this.context));

      // Create global options object.
      this._hookOptions = {
        sp: sp
      };
    });
  }

  public render(): void
  {
    const element: React.ReactElement<IPnpReactHookExamplesProps> = React.createElement(
      PnpReactHookExamples,
      {
        description: this.properties.description,
        options: this._hookOptions // pass options in props.
      }
    );

    ReactDom.render(element, this.domElement);
  }
}
```

**PnpReactHookExamples.tsx**
```tsx
import * as React from 'react';
import { IPnpReactHookExamplesProps } from './IPnpReactHookExamplesProps';
import { PnpHookOptionProvider } from "pnp-react-hooks";

const PnpReactHookExamples = (props: IPnpReactHookExamplesProps) =>
{
  // load options to provider
  return (
    <PnpHookOptionProvider value={props.options}>
     {/* your web part components */}
    </PnpHookOptionProvider>
  );
};

export default PnpReactHookExamples;
```

## Using dependency variables

All hooks supports custom dependency array similar to React's built-in hooks, but unlike React some parameters tracked internally and including them in array is not required. Hooks repeat requests when dependencies are changed.

```typescript
let title = "My List";

// request repeated when `title` and query changes.
const myList = useList(title, {
	query: {
		select: ["Title"]
	}
});

const unnecessary = useList(title, {
	query: {
		select: ["Title"]
	}
}, [title]); // passing title and query is not required. They are already tracking internally.

let refresh = {};

const forcedRefresh = useList(title, {
	query: {
		select: ["Title"]
	}
}, [refresh]); // You can force refresh with your custom variables.
```

:::info

Tracked parameters are marked with `🚩` symbol in [docs](API/index.md).

:::

## Behaviors

You can leverage PnPJs v3 behaviors for hooks both individually and globally. 

**Global**
```typescript
export default class PnpReactHookExamplesWebPart extends BaseClientSideWebPart<IPnpReactHookExamplesWebPartProps>
{
  private _hookOptions: PnpHookGlobalOptions;

  // Create onInit function to initialize options.
  protected onInit(): Promise<void>
  {
    return super.onInit().then(async (_) =>
    {
	  // Simply initialize spfi with your custom behaviors
      const sp = spfi().using(SPFx(this.context), Caching(), MyCustomBehavior());

      // Create global options object.
      this._hookOptions = {
        sp: sp
      };
    });
  }
}
```

**Local**
```typescript
export default function useWhoAmI()
{
	// Apply your custom behaviors to single hook with behaviors option.
    const user = useCurrentUser({
		behaviors: [Caching(), MyCustomBehavior()] 
	});

    // useProfile not affected by Caching and MyCustomBehavior
	const profile = useProfile(user?.LoginName, {
		disabled: "auto"
	});

	return [user, profile];
}
```

:::info

`behaviors` property doesn't override your global behavior configuration, it only appends behaviors to inner queryable instance.

:::

## Configure for multiple sites

Multiple [`PnpHookOptionProvider`](API/PnPHookOptionProvider.md) can be initialized with different `spfi` configurations for accessing multiple sites or different options.

```tsx
const sp_siteA = spfi("tenant/siteA");
const sp_siteB = spfi("tenant/siteB").using(Caching());
const sp_siteC = spfi("tenant/siteC").using(MyCustomLogger());

export default function WebPart()
{
	return (
	<>
		{/* Site A */}
		<PnpHookOptionProvider value={{sp: sp_siteA}}>
			<ComponentA />
			<ComponentB />
		</PnpHookOptionProvider>
		{/* Site B */}
		<PnpHookOptionProvider value={{sp: sp_siteB, keepPreviousState: true}}>
			<ComponentA />
				{/* Site C */}
				<PnpHookOptionProvider value={{sp: sp_siteC, disabled: "auto"}}>
					<ComponentA />
					<ComponentB />
				</PnpHookOptionProvider>);
			<ComponentB />
		</PnpHookOptionProvider>
	</>);
}
```

## Accessing options

Global options can be accessed with [`usePnpHookOptions`](API/usePnpHookOptions.md) helper; This can be useful when deriving options or accessing to  `spfi`.

:::tip

PnP React hooks only provides functions for read data but you can access and use `spfi` to add, update, delete entities.

:::