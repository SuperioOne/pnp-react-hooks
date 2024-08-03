## useGroup

```typescript
useGroup(
	groupId: string | number,
	options?: GroupOptions,
	deps?: any[]): ISiteGroupInfo | null | undefined;
```

Returns a group from group collection.

## Examples

Get group info by Id,
```typescript
const group = useGroup(10);
```

Get group info by name
```typescript
const mySpGroup = useGroup("My SharePoint Group");
```

Query group properties,
```typescript
const mySpGroup = useGroup("My SharePoint Group", {
	query: {
		select: ["Title", "Id"]
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `groupId` | `string` \| `number` | Group Id or name | Yes |
| `options?` | `GroupOptions` | useApps hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

