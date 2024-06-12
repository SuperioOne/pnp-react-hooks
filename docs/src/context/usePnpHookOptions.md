## Definition

▸ **usePnpHookOptions**(): `ReadOnly`<[PnpHookGlobalOptions](Interfaces/PnpHookGlobalOptions.md)\>

Returns options from nearest [`PnpHookOptionProvider`](PnpHookOptionProvider.md).

## Returns

`ReadOnly`<[PnpHookGlobalOptions](Interfaces/PnpHookGlobalOptions.md)\>

## Example

```tsx
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { usePnpHookOptions } from "pnp-react-hooks;

function ExampleComponent()
{
    // get options from nearest parent provider.
    const options = usePnpHookOptions();

    const onClick = () =>
    {
        options?.sp.web.lists.getByTitle("My List").items
            .add({ Title: "New Item" })
            .then(console.log)
            .error(console.error);
    };

    return (<button onClick={onClick}>Add New Item</button>);
}
```