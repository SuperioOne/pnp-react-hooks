# useAttachment

```typescript
useAttachment(
	attachmentName:string,
	itemId:number,
	list:string,
	options?: AttachmentInfoOptions,
	deps?:any[]): IAttachmentInfo | null | undefined;

useAttachment(
	attachmentName:string,
	itemId:number,
	list:string,
	options?: AttachmentTextOptions,
	deps?:any[]): string | null | undefined;

useAttachment(
	attachmentName:string,
	itemId:number,
	list:string,
	options?: AttachmentBlobOptions,
	deps?:any[]): Blob | null | undefined;

useAttachment(
	attachmentName:string,
	itemId:number,
	list:string,
	options?: AttachmentBufferOptions,
	deps?:any[]): ArrayBuffer | null | undefined;
```

Returns an attachment info or attachment content from item.

## Examples

Get attachment info,
```typescript
const attachmentProps = useAttachment("my-attachment.txt", 12, "My List");
```

Get attachment info with query,
```typescript
const attachmentProps = useAttachment("my-attachment.txt", 12, "My List"), {
	query: {
		select: ["Title", "Id"]
	}
});
```

Get attachment content as `Blob`,
```typescript
const contentAsBlob = useAttachment("my-attachment.txt", 12, "My List", {
	type: "blob"
});
```
Get attachment content as `ArrayBuffer`,
```typescript
const contentAsBuffer = useAttachment("my-attachment.txt", 12, "My List", {
	type: "buffer"
});
```

Get attachment content as `string`,
```typescript
const contentAsText = useAttachment("my-attachment.txt", 12, "My List", {
	type: "text"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `attachmentName` | `string` | Attachment name | Yes |
| `itemId` | `number` | List item ID | Yes |
| `list` | `string` | Target list UUID or title | Yes |
| `options?` | `WebAppOptions` | useAttachment hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

