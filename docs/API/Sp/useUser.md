[API](API/index.md) / [Sp](API/index.md#sp) / useUser

## Definition

▸ **useUser**(`userId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

Returns an user from site user collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` \| `number` | User Id, login name, email. |
| `options?` | [`UserOptions`](UserOptions.md) |  |
| `deps?` | `DependencyList` |  |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

## Examples

```typescript
// get site user by Id
const userById = useUser(27);

// get site user by email 
const userByEmail = useUser("user@example.onmicrosoft.com");

// get site user by login name
const userByLoginName = useUser("i:0#.f|membership|user@example.onmicrosoft.com");

// get site user with query
const userById = useUser(27, {
	query: {
		select: ["Id", "Title", "LoginName"]
	}
});
```