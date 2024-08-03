# useIsMemberOf

```typescript
useIsMemberOf(
	groupId: string | number,
	options?: IsMemberOfOptions,
	deps?: any[]): [boolean, ISiteGroupInfo];
```

Returns users membership info for the specified group. Use `IsMemberOfOptions.userId` property to check another user. Default is current user.

## Examples

Get current users membership info,
```typescript
const [isMember, groupInfo] = useIsMemberOf(10);
```

Get different users membership info,
```typescript
const [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {
	userId: "user@example.onmicrosoft.com"
});

const [isMember, groupInfo] = useIsMemberOf("My SharePoint Group", {
	userId: 25
});

const [isMember, groupInfo] = useIsMemberOf(10, {
	userId: "i:0#.f|membership|user@example.onmicrosoft.com"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `groupId` | `string` | Group name or Id | Yes |
| `options?` | `IsMemberOfOptions` | useIsMemberOf hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

