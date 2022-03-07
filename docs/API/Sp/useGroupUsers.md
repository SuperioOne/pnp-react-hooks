
## Definition

▸ **useGroupUsers**(`groupId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`[]\>

Returns user collection from specific group.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group name or Id. Changing the value resends request. |
| `options?` | [`GroupUsersOptions`](../Interfaces/GroupUsersOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroupUsers will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`[]\>

## Examples

```typescript
const groupUsers = useGroupUsers(10);

const myGroupUsers = useGroupUsers("My SharePoint Group");

const filteredGroupUsers = useGroupUsers("My SharePoint Group", {
	query:{
		select: ["LoginName", "Title"],
		filter: "IsSiteAdmin eq false"
	}
});
```
