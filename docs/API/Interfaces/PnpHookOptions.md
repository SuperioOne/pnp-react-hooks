import ToolTip from '@site/src/components/tooltip';

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Nullable`](../Types/NullableT.md)<[`ODataQueryableCollection`](ODataQueryableCollection.md) \| [`ODataQueryable`](ODataQueryable.md)\> |

## Hierarchy

- [`ErrorOptions`](ErrorOptions.md)

- [`RenderOptions`](RenderOptions.md)

- [`ContextOptions`](ContextOptions.md)

- [`BehaviourOptions`](BehaviourOptions.md)

  ↳ **`PnpHookOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[BehaviourOptions](BehaviourOptions.md).[behaviors](BehaviourOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| [`DisableOptionFuncType`](../Types/DisableOptionType.md#disableoptionfunctype)

Disable hook calls and renders.

#### Inherited from

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

### query

• `Optional` **query**: [`Nullable`](../Types/NullableT.md)<`T`\>

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

#### Inherited from

[ContextOptions](ContextOptions.md).[sp](ContextOptions.md#sp)