## Definition

▸ **usePnpHookOptions**(): `ReadOnly`<[PnpHookGlobalOptions](Interfaces/PnpHookGlobalOptions.md)\>

Returns options from nearest [`PnpHookOptionProvider`](PnpHookOptionProvider.md).

## Returns

`ReadOnly`<[PnpHookGlobalOptions](Interfaces/PnpHookGlobalOptions.md)\>

## Example

```tsx
import * as React from "react";
import {useWebInfo, PnpHookOptionProvider} from "pnp-react-hooks";
import { Caching } from "@pnp/queryable";
import { spfi, SPFx } from "@pnp/sp";
import { CopyFrom } from "@pnp/core";

const options: PnpHookGlobalOptions = {
	disabled: "auto",
	keepPreviousState: true,
	error: console.debug,
	sp: spfi().using(SPFx(this.context))
};

export function Main()
{
	return(<PnpHookOptionProvider value={options}>
				<ChildComponent />
			</PnpHookOptionProvider>);
}

function ChildComponent()
{
	// get options from nearest parent provider.
	const options = usePnpHookOptions();

	useEffect(() => {
		options.sp.web.lists.getByTitle("My List").items.add({
			Title: "New"
		})
			.then(console.log)
			.error(console.error);
	},[options]);

	return <></>;
}
```