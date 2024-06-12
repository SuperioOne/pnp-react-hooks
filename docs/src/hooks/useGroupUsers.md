import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useGroupUsers**(`groupId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`[]\>

Returns user collection from specific group.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group name or Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`GroupUsersOptions`](../Interfaces/GroupUsersOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroupUsers refreshes response data when one of the dependencies changes. |

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
