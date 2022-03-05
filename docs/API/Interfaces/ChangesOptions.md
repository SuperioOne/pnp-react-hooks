[API](API/index.md) / [Interfaces](index.md)  / ChangesOptions

## Hierarchy

- [`RenderOptions`](types_options_RenderOptions.RenderOptions.md)

- [`ContextOptions`](types_options_ContextOptions.ContextOptions.md)

- [`ErrorOptions`](types_options_ExceptionOptions.ErrorOptions.md)

- [`BehaviourOptions`](types_options_BehaviourOptions.BehaviourOptions.md)

  ↳ **`ChangesOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[BehaviourOptions](types_options_BehaviourOptions.BehaviourOptions.md).[behaviors](types_options_BehaviourOptions.BehaviourOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| (`changeQuery`: `IChangeQuery`) => `boolean`

Disable hook calls and renders.

#### Overrides

[RenderOptions](types_options_RenderOptions.RenderOptions.md).[disabled](types_options_RenderOptions.RenderOptions.md#disabled)

___

### error

• `Optional` **error**: [`ErrorFunc`](types_options_ExceptionOptions.md#errorfunc) \| [`ErrorMode`](ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](ErrorMode.md#default).

#### Inherited from

[ErrorOptions](types_options_ExceptionOptions.ErrorOptions.md).[error](types_options_ExceptionOptions.ErrorOptions.md#error)

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as `undefined`. Default is `false`.

#### Inherited from

[RenderOptions](types_options_RenderOptions.RenderOptions.md).[keepPreviousState](types_options_RenderOptions.RenderOptions.md#keeppreviousstate)

___

### list

• `Optional` **list**: `string`

List GUID Id or title for getting list changes. Keep undefined for web changes.
Changing list value resends request.

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

#### Inherited from

[ContextOptions](types_options_ContextOptions.ContextOptions.md).[sp](types_options_ContextOptions.ContextOptions.md#sp)
