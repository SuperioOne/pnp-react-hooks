import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useGroupUser**(`groupId`, `userId`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

Returns an user from specific group user collection.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group name or Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `userId` | `string` \| `number` | User email, login name or Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`GroupUserOptions`](../Interfaces/GroupUserOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useGroupUser refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteUserInfo`\>

## Examples

```typescript
const groupUser = useGroupUser(10, 27);

const groupUser = useGroupUser("My SharePoint Group", 27);

const groupUser = useGroupUser("My SharePoint Group", "user@example.onmicrosoft.com");

const groupUser = useGroupUser("My SharePoint Group", "i:0#.f|membership|user@example.onmicrosoft.com");
```