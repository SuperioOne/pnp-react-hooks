[API](API/index.md) / [Sp](API/index.md#sp) / useSiteUsers

## Definition

▸ **useSiteUsers**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`[]\>

Returns site users.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SiteUsersOptions`](useSiteUsers.md#siteusersoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useSiteUsers will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`[]\>

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