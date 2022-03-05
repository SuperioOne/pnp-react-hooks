[API](API/index.md) / [Interfaces](index.md) / ListTokenOptions

## Hierarchy

- [`ErrorOptions`](types_options_ExceptionOptions.ErrorOptions.md)

- [`ContextOptions`](types_options_ContextOptions.ContextOptions.md)

- [`BehaviourOptions`](types_options_BehaviourOptions.BehaviourOptions.md)

  ↳ **`ListTokenOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[BehaviourOptions](types_options_BehaviourOptions.BehaviourOptions.md).[behaviors](types_options_BehaviourOptions.BehaviourOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| (`list`: `string`) => `boolean`

Disable hook calls and renders.

___

### error

• `Optional` **error**: [`ErrorFunc`](types_options_ExceptionOptions.md#errorfunc) \| [`ErrorMode`](ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](ErrorMode.md#default).

#### Inherited from

[ErrorOptions](types_options_ExceptionOptions.ErrorOptions.md).[error](types_options_ExceptionOptions.ErrorOptions.md#error)

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

#### Inherited from

[ContextOptions](types_options_ContextOptions.ContextOptions.md).[sp](types_options_ContextOptions.ContextOptions.md#sp)