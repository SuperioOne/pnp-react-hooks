# Accessing Options

```typescript
usePnpHookOptions(): PnpHookGlobalOptions;
```

Returns options from the nearest [`PnpHookOptionProvider`](./option-provider.md).

## Example

```typescript
import { usePnpHookOptions } from "pnp-react-hooks";

function ExampleComponent() {
    const options = usePnpHookOptions();

    .....
    .....
    .....
    .....
}
```
