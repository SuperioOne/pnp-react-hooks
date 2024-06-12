## Definition

▸ **useProfile**<`T`\>(`loginName`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`\>

Returns an user profile for specified login name.

## Type parameters

| Name |
| :------ |
| `T` |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loginName` | `string` | User login name. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ProfileOptions`](../Interfaces/ProfileOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useProfile refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`\>

## Examples

```typescript
// get profile by user email
const profileByEmail = useProfile("user@example.onmicrosoft.com");

// get profile by user login name
const profile = useProfile("i:0#.f|membership|user@example.onmicrosoft.com");
```
