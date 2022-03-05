[API](API/index.md) / [Interfaces](index.md) / AttachmentInfoOptions

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| (`attachmentName`: `string`, `itemId`: `number`, `list`: `string`) => `boolean`

Disable hook calls and renders.

___

### error

• `Optional` **error**: [`ErrorFunc`](types_options_ExceptionOptions.md#errorfunc) \| [`ErrorMode`](ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](ErrorMode.md#default).

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as `undefined`. Default is `false`.

___

### query

• `Optional` **query**: [`Nullable`](NullableT.md#nullable)<[`ODataQueryable`](types_ODataQueryable.ODataQueryable.md)\>


___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

___

### type

• `Optional` **type**: ``"info"``
