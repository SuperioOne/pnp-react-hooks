# useItemComments

```typescript
useItemComments(
  itemId: number,
  list: string,
  options?: ItemCommentsOptions,
  deps?: any[]): ICommentInfo[] | null | undefined;
```

Returns comments for specific list item.

## Examples

Get list items comments,
```typescript
const comments = useItemComments(12, "My List Title");
const comments = useItemComments(12, "5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `itemId` | `number` | Item Id | Yes |
| `list` | `string` | List UUID or title | Yes |
| `options?` | `ItemCommentsOptions` | useItemComments hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

