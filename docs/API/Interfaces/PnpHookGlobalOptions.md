
## Hierarchy

- [`ErrorOptions`](ErrorOptions.md)

- [`RenderOptions`](RenderOptions.md)

- `Required`<[`ContextOptions`](ContextOptions.md)\>

  ↳ **`PnpHookGlobalOptions`**

## Properties

### disabled

• `Optional` **disabled**: `boolean` \| ``"auto"``

Disable all hook calls in child components.

#### Overrides

[RenderOptions](RenderOptions.md).[disabled](RenderOptions.md#disabled)

___

### error

• `Optional` **error**: [`ErrorFunc`](../Types/ErrorFunc.md#errorfunc) \| [`ErrorMode`](../Enums/ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](../Enums/ErrorMode.md#default).

#### Inherited from

[ErrorOptions](ErrorOptions.md).[error](ErrorOptions.md#error)

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request is resolved rather than clearing the state as `undefined`. Default value is `false`.


#### Inherited from

[RenderOptions](RenderOptions.md).[keepPreviousState](RenderOptions.md#keeppreviousstate)


___

### sp

• **sp**: `SPFI`

Pnp SP context.
