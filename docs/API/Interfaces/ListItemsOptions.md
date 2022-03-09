import ToolTip from '@site/src/components/tooltip';

## Hierarchy

- [`PnpHookOptions`](PnpHookOptions.md)<[`ODataQueryableCollection`](ODataQueryableCollection.md)\>

  ↳ **`ListItemsOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[PnpHookOptions](PnpHookOptions.md).[behaviors](PnpHookOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| (`list`: `string`) => `boolean`

Disable hook calls and renders.

#### Overrides

[PnpHookOptions](PnpHookOptions.md).[disabled](PnpHookOptions.md#disabled)

___

### error

• `Optional` **error**: [`ErrorFunc`](../Types/ErrorFunc.md#errorfunc) \| [`ErrorMode`](../Enums/ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](../Enums/ErrorMode.md#default).

#### Inherited from

[PnpHookOptions](PnpHookOptions.md).[error](PnpHookOptions.md#error)

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as `undefined`. Default is `false`.

#### Inherited from

[PnpHookOptions](PnpHookOptions.md).[keepPreviousState](PnpHookOptions.md#keeppreviousstate)

___

### mode

• `Optional` **mode**: [`Default`](API/Enums/ListOptions.md#default)

Request mode. <ToolTip text="Changing mode repeats request">🚩</ToolTip>

___

### query

• `Optional` **query**: [`Nullable`](../Types/NullableT.md)<[`ODataQueryableCollection`](ODataQueryableCollection.md)\>

OData query. <ToolTip text="Any meaningful change repeats request">🚩</ToolTip>

#### Inherited from

[PnpHookOptions](PnpHookOptions.md).[query](PnpHookOptions.md#query)

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context. <ToolTip text="Changing sp value repeats request">🚩</ToolTip>

#### Inherited from

[PnpHookOptions](PnpHookOptions.md).[sp](PnpHookOptions.md#sp)