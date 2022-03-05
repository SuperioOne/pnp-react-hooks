[API](API/index.md) / [Sp](API/index.md#sp) / useGroups

## Definition

▸ **useGroups**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteGroupInfo`[]\>

Returns group collection. Use [`GroupsOptions.userId`](GroupsOptions.md#userid) property to get
groups for specific user.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`GroupsOptions`](GroupsOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroups will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteGroupInfo`[]\>

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