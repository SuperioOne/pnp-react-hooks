[API](API/index.md) / [Sp](API/index.md#sp) / useContentTypes

## Definition

▸ **useContentTypes**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IContentTypeInfo`[]\>

Returns content types of web or list. Use [`ItemContentTypeOptions.list`](ItemContentTypeOptions.md#list) property to get list content types instead of web content types.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ItemContentTypeOptions`](ItemContentTypeOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useContentTypes will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IContentTypeInfo`[]\>

array of `IContentTypeInfo`.

## Examples

```typescript
// web content types
const webContentTypes = useContentTypes();

// list content types by list Id
const listContentTypes = useContentTypes({
	list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});

// list content types by list title
const listContentTypes = useContentTypes({
	list: "My List Title"
});
```