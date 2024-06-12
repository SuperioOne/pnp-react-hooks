## Definition

▸ **PnpHookOptionProvider**(`props`): `Element`

React context wrapper for PnP React hooks.

## Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `any` |
| `props.value` | [`PnpHookGlobalOptions`](Interfaces/PnpHookGlobalOptions.md) |

## Returns

`Element`

## Example

```tsx
import * as React from "react";
import { useWebInfo, PnpHookOptionProvider, PnpHookGlobalOptions } from "pnp-react-hooks";
import { Caching } from "@pnp/queryable";
import { spfi, SPBrowser } from "@pnp/sp";

const options: PnpHookGlobalOptions = {
	disabled: "auto",
	keepPreviousState: true,
	error: console.debug,
	sp: spfi().using(SPBrowser())
};

const cachedOptions: PnpHookGlobalOptions = {
	disabled: "auto",
	keepPreviousState: true,
	error: console.debug,
	sp: spfi().using(SPBrowser(), Caching())
};

export function Main()
{
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

export function CurrentWebInfo()
{
	const web = useWebInfo();
	return <h1>{web?.Title}</h1>;
}

export function UserInfo()
{
	const user = useCurrentUser();
	return <h2>{user?.Title}</h2>;
}
```