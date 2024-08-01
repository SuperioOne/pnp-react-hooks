# useAttachments 

```typescript
useAttachments(
	itemId:number, 
	list:string,
	options?: ItemAttachmentsOptions,
	deps: any[]): IAttachmentInfo[] | null | undefined;
```

Returns all attachments of the item.

## Examples

Get all attachments from an item,
```typescript
const attachments = useAttachments(10, "My List");
```

Get attachments with query from an item,
```typescript
const filteredAttachments = useAttachments(10, "5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Name", "Id"],
		filter: "substringof('.pdf', Name) eq true"
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `itemId` | `number` | List item ID | Yes |
| `list` | `string` | Target list UUID or title | Yes |
| `options?` | `ItemAttachmentsOptions` | useAttachment hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

