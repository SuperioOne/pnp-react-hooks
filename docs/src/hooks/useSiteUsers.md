
## Definition

▸ **useSiteUsers**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`[]\>

Returns site users.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SiteUsersOptions`](../Interfaces/SiteUsersOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSiteUsers refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`[]\>

## Examples

```typescript
// basic usage
const siteUsers = useSiteUsers();

// with query
const topFiveUser = useSiteUsers({
	query: {
		select: ["Title", "Id", "LoginName"],
		top: 5
	}
});
```