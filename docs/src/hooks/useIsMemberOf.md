import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useIsMemberOf**(`groupId`, `options?`, `deps?`): \[`Nullable<boolean>`, `Nullable<ISiteGroupInfo>`\]

Returns `true`, if user is member of group. If not returns `false`. Use [`IsMemberOfOptions.userId`](../Interfaces/IsMemberOfOptions.md#userid) property for another user. Default is current user.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` \| `number` | Group name or Id. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`IsMemberOfOptions`](../Interfaces/IsMemberOfOptions.md) | Pnp hook options. |
| `deps?` | `DependencyList` | useIsMemberOf refreshes response data when one of the dependencies changes. |

## Returns

\[`Nullable<boolean>`, `Nullable<ISiteGroupInfo>`\]

## Examples

```typescript
// get current user membership info for group
const [isMember, groupInfo] = useIsMemberOf(10);

// get user membership info for group
const [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {
	userId: "user@example.onmicrosoft.com"
});

// get user membership info for group
const [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {
	userId: 25
});

// get user membership info for group
const [isMember, groupInfo] = useIsMemberOf(10, {
	userId: "i:0#.f|membership|user@example.onmicrosoft.com"
});
```