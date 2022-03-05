[API](API/index.md)  / [Modules](API/index.md) / [types/options/ContextOptions](types_options_ContextOptions.md) / ContextOptions

# Interface: ContextOptions

[types/options/ContextOptions](types_options_ContextOptions.md).ContextOptions

## Hierarchy

- **`ContextOptions`**

  ↳ [`ChangesOptions`](ChangesOptions.md)

  ↳ [`FolderTreeOptions`](FolderTreeOptions.md)

  ↳ [`UserPermissionOptions`](UserPermissionOptions.md)

  ↳ [`IsMemberOfOptions`](IsMemberOfOptions.md)

  ↳ [`ListTokenOptions`](ListTokenOptions.md)

  ↳ [`ProfileOptions`](ProfileOptions.md)

  ↳ [`SearchOptions`](SearchOptions.md)

  ↳ [`_PnpHookOptions`](types_options._PnpHookOptions.md)

  ↳ [`PnpHookOptions`](types_options.PnpHookOptions.md)

## Table of contents

### Properties

- [sp](types_options_ContextOptions.ContextOptions.md#sp)

## Properties

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
