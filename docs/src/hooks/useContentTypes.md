
## Definition

▸ **useContentTypes**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IContentTypeInfo`[]\>

Returns content types of web or list. Use [`ItemContentTypeOptions.list`](../Interfaces/ItemContentTypeOptions.md#list) property to get list content types instead of web content types.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ItemContentTypeOptions`](../Interfaces/ItemContentTypeOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useContentTypes refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IContentTypeInfo`[]\>

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