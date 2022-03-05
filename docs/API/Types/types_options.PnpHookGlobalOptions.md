[API](API/index.md)  / [Modules](API/index.md) / [types/options](types_options.md) / PnpHookGlobalOptions

# Interface: PnpHookGlobalOptions

[types/options](types_options.md).PnpHookGlobalOptions

**`inheritdoc`**

## Hierarchy

- [`ErrorOptions`](types_options_ExceptionOptions.ErrorOptions.md)

- [`RenderOptions`](types_options_RenderOptions.RenderOptions.md)

- `Required`<[`ContextOptions`](types_options_ContextOptions.ContextOptions.md)\>

  ↳ **`PnpHookGlobalOptions`**

## Table of contents

### Properties

- [disabled](types_options.PnpHookGlobalOptions.md#disabled)
- [error](types_options.PnpHookGlobalOptions.md#error)
- [keepPreviousState](types_options.PnpHookGlobalOptions.md#keeppreviousstate)
- [sp](types_options.PnpHookGlobalOptions.md#sp)

## Properties

### disabled

• `Optional` **disabled**: `boolean` \| ``"auto"``

Disable all hook calls in child components.

**`example`**
Example values
```
true       // disable all hooks
false      // enable all hooks
undefined  // enable all hooks
"auto"     // disable hooks by checking required parameters
```

#### Overrides

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

### sp

• **sp**: `SPFI`

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

Required.sp
