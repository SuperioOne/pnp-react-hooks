[API](API/index.md)  / [Modules](API/index.md) / [types/options/RenderOptions](types_options_RenderOptions.md) / RenderOptions

# Interface: RenderOptions

[types/options/RenderOptions](types_options_RenderOptions.md).RenderOptions

## Hierarchy

- **`RenderOptions`**

  ↳ [`ChangesOptions`](ChangesOptions.md)

  ↳ [`FolderTreeOptions`](FolderTreeOptions.md)

  ↳ [`UserPermissionOptions`](UserPermissionOptions.md)

  ↳ [`IsMemberOfOptions`](IsMemberOfOptions.md)

  ↳ [`ProfileOptions`](ProfileOptions.md)

  ↳ [`SearchOptions`](SearchOptions.md)

  ↳ [`_PnpHookOptions`](types_options._PnpHookOptions.md)

  ↳ [`PnpHookOptions`](types_options.PnpHookOptions.md)

  ↳ [`PnpHookGlobalOptions`](types_options.PnpHookGlobalOptions.md)

## Table of contents

### Properties

- [disabled](types_options_RenderOptions.RenderOptions.md#disabled)
- [keepPreviousState](types_options_RenderOptions.RenderOptions.md#keeppreviousstate)

## Properties

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



___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request resolves rather than clearing the state as 'undefined'.

**`remarks`**
By default hooks clear their current state when a new request started.
Setting state to 'undefined' causes an extra rendering on the component but,
can be used for loading/shimmer/skeleton effects.

**`default`** false
