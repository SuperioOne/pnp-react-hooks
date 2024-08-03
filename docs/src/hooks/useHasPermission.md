# useHasPermission

```typescript
useHasPermission(
	permissionKinds: PermissionKind | PermissionKind[],
	options?: UserPermissionOptions,
	deps?): boolean | null | undefined;
```

Returns `true` if user has permission on scope. If not returns `false`. Use 
`UserPermissionOptions.userId` for another user and `UserPermissionOptions.scope`
for permission scope. Default is current user permission on current web scope.

## Examples

Check current users web permissions,
```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages
const hasPermission = useHasPermission(permissions);
```


Check another users permission on web,
```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages
const userHasPermission = useHasPermission(permissions, {
	userId: "user@example.onmicrosoft.com"
});
```

Check list permissions,
```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages
const hasPermission = useHasPermission(permissions, {
	scope: {
		list: "My List Title"
	}
});
```

Check item permissions,
```typescript
import { PermissionKind } from "@pnp/sp/security";
import { useHasPermission } from "pnp-react-hooks";

const permissions = PermissionKind.ViewListItems | PermissionKind.ViewPages
const hasPermission = useHasPermission(permissions, {
	scope: {
		list: "My List Title",
		item: 12
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `permissionKinds` | `PermissionKind` \| `PermissionKind[]` | SP permission kind array or value | Yes |
| `options?` | `UserPermissionOptions` | useHasPermission hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

