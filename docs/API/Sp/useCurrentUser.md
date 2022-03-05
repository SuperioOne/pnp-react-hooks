[API](API/index.md) / [Sp](API/index.md#sp) / useCurrentUser

## Definition

▸ **useCurrentUser**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

Returns current user information.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`CurrentUserInfoOptions`](useCurrentUser.md#currentuserinfooptions) | PnP hook options |
| `deps?` | `DependencyList` | useCurrentUser will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

## Examples

```typescript
// basic usage
const userAllProps = useCurrentUser();

// with query
const user = useCurrentUser({
	query: {
		select: ["Title", "Id", "LoginName"]
	}
});
```