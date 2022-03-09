import ToolTip from '@site/src/components/tooltip';

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| (`fileId`: `string`) => `boolean`

Disable hook calls and renders.

___

### error

• `Optional` **error**: [`ErrorFunc`](../Types/ErrorFunc.md#errorfunc) \| [`ErrorMode`](../Enums/ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](../Enums/ErrorMode.md#default).

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as `undefined`. Default is `false`.

___

### query

• `Optional` **query**: [`Nullable`](../Types/NullableT.md)<[`ODataQueryable`](ODataQueryable.md)\>

OData query. <ToolTip text="Any meaningful change repeats request">🚩</ToolTip>
___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context. <ToolTip text="Changing sp value repeats request">🚩</ToolTip>

___

### type

• `Optional` **type**: `"info"`

Request type. <ToolTip text="Changing the type repeats request">🚩</ToolTip>