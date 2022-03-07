
## Definition

▸ **useGroup**(`groupId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteGroupInfo`\>

Returns a group from group collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group Id or name. Changing the value resends request. |
| `options?` | [`GroupOptions`](../Interfaces/GroupOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useGroup will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteGroupInfo`\>

## Examples

```typescript
// get group info by Id
const group = useGroup(10);

// get group info by name
const mySpGroup = useGroup("My SharePoint Group");

// get group with query
const mySpGroup = useGroup("My SharePoint Group", {
	query: {
		select: ["Title", "Id"]
	}
});
```
