
## Properties

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| [`DisableOptionFuncType`](../Types/DisableOptionType.md#disableoptionfunctype)

Disable hook calls and renders.

#### Examples

|  Value | Description |
| :------ | :------ |
| `true` | disable hook |
| `false` | enable hook  |
| `undefined` | enable hook  |
| `"auto"` | disable hook by checking required parameters |
|(...param:`any[]`) => `boolean`|custom check function |

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request is resolved rather than clearing the state as `undefined`. Default value is `false`.

#### Remarks
By default hooks clear their current state when a new request started.
Setting state to 'undefined' causes an extra rendering on the component but,
can be used for loading/shimmer/skeleton effects.