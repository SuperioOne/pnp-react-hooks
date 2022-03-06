[API](../index.md) / [Interfaces](index.md) / AttachmentTextOptions

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| (`attachmentName`: `string`, `itemId`: `number`, `list`: `string`) => `boolean`

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

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

___

### type

• **type**: ``"text"``
