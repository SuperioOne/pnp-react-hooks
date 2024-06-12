
## Definition

▸ **useGroups**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteGroupInfo`[]\>

Returns group collection. Use [`GroupsOptions.userId`](../Interfaces/GroupsOptions.md#userid) property to get
groups for specific user.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`GroupsOptions`](../Interfaces/GroupsOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroups refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteGroupInfo`[]\>

## Examples

```typescript
// get all groups
const groups = useGroups();

// get all user groups by user Id
const userGroups = useGroups({
	userId: 20
});

// get all user groups by user email
const userGroupsByEmail = useGroups({
	userId: "user@example.onmicrosoft.com"
});

// get all user groups by user login name
const userGroupsByLoginName = useGroups({
	userId: "i:0#.f|membership|user@example.onmicrosoft.com"
});
```