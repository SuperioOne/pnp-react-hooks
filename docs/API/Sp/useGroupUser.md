[API](API/index.md) / [Sp](API/index.md#sp) / useGroupUser

## Definition

▸ **useGroupUser**(`groupId`, `userId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

Returns an user from specific group user collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group name or Id. Changing the value resends request. |
| `userId` | `string` \| `number` | User email, login name or Id. Changing the value resends request. |
| `options?` | [`GroupUserOptions`](GroupUserOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroupUser will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteUserInfo`\>

## Examples

```typescript
const groupUser = useGroupUser(10, 27);

const groupUser = useGroupUser("My SharePoint Group", 27);

const groupUser = useGroupUser("My SharePoint Group", "user@example.onmicrosoft.com");

const groupUser = useGroupUser("My SharePoint Group", "i:0#.f|membership|user@example.onmicrosoft.com");
```