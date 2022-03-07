
## Definition

▸ **useCurrentUser**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

Returns current user information.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`CurrentUserInfoOptions`](../Interfaces/CurrentUserInfoOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useCurrentUser will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

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