import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useUser**(`userId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

Returns an user from site user collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` \| `number` | User Id, login name, email. <ToolTip text="Changing the value repeats request">🚩</ToolTip> |
| `options?` | [`UserOptions`](../Interfaces/UserOptions.md) | PnP hook options.  |
| `deps?` | `DependencyList` | useUser will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

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