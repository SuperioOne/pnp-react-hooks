[API](API/index.md)  / [Modules](API/index.md) / [types/options](types_options.md) / PnpHookOptions

# Interface: PnpHookOptions<T\>

[types/options](types_options.md).PnpHookOptions

**`inheritdoc`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Nullable`](NullableT.md#nullable)<[`ODataQueryableCollection`](types_ODataQueryable.ODataQueryableCollection.md) \| [`ODataQueryable`](types_ODataQueryable.ODataQueryable.md)\> |

## Hierarchy

- [`ErrorOptions`](types_options_ExceptionOptions.ErrorOptions.md)

- [`RenderOptions`](types_options_RenderOptions.RenderOptions.md)

- [`ContextOptions`](types_options_ContextOptions.ContextOptions.md)

- [`BehaviourOptions`](types_options_BehaviourOptions.BehaviourOptions.md)

  ↳ **`PnpHookOptions`**

## Table of contents

### Properties

- [behaviors](types_options.PnpHookOptions.md#behaviors)
- [disabled](types_options.PnpHookOptions.md#disabled)
- [error](types_options.PnpHookOptions.md#error)
- [keepPreviousState](types_options.PnpHookOptions.md#keeppreviousstate)
- [query](types_options.PnpHookOptions.md#query)
- [sp](types_options.PnpHookOptions.md#sp)

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

**`remarks`** You can define built-in or custom behaviors for single hook.
for more details see PnPjs original docs [https://pnp.github.io/pnpjs/core/behaviors/](https://pnp.github.io/pnpjs/core/behaviors/)

#### Inherited from

[BehaviourOptions](types_options_BehaviourOptions.BehaviourOptions.md).[behaviors](types_options_BehaviourOptions.BehaviourOptions.md#behaviors)



___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](types_options_RenderOptions.md#disableoptionvaluetype) \| [`DisableOptionFuncType`](types_options_RenderOptions.md#disableoptionfunctype)

Disable hook calls and renders.

**`example`**
Example values
```
true       // disable all hooks
false      // enable all hooks
undefined  // enable all hooks
"auto"     // disable hooks by checking required parameters
(...param: any[]) => { return someValue === someOtherValue; }  // custom check function
```

#### Inherited from

[RenderOptions](types_options_RenderOptions.RenderOptions.md).[disabled](types_options_RenderOptions.RenderOptions.md#disabled)



___

### error

• `Optional` **error**: [`ErrorFunc`](types_options_ExceptionOptions.md#errorfunc) \| [`ErrorMode`](ErrorMode.md)

Error handling

**`default`** [ErrorMode.Default](ErrorMode.md#default)

#### Inherited from

[ErrorOptions](types_options_ExceptionOptions.ErrorOptions.md).[error](types_options_ExceptionOptions.ErrorOptions.md#error)



___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as 'undefined'.

**`remarks`**
By default hooks clear their current state when a new request started.
Setting state to 'undefined' causes an extra rendering on the component but,
can be used for loading/shimmer/skeleton effects.

**`default`** false

#### Inherited from

[RenderOptions](types_options_RenderOptions.RenderOptions.md).[keepPreviousState](types_options_RenderOptions.RenderOptions.md#keeppreviousstate)



___

### query

• `Optional` **query**: [`Nullable`](NullableT.md#nullable)<`T`\>



___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context.

**`example`**
Example usage for SPFX webparts
```
import { spfi, SPFx } from "@pnp/sp";

spfi("your tenant url").using(SPFx(this.context))
```

**`remarks`**
for more details see [https://pnp.github.io/pnpjs/sp/behaviors/](https://pnp.github.io/pnpjs/sp/behaviors/)

#### Inherited from

[ContextOptions](types_options_ContextOptions.ContextOptions.md).[sp](types_options_ContextOptions.ContextOptions.md#sp)
