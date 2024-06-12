
## Definition

▸ **useFields**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IFieldInfo`[]\>

Returns field collection from web or list. List option can be defined in [`FieldsOptions.list`](../Interfaces/FieldsOptions.md#list) property.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`FieldsOptions`](../Interfaces/FieldsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFields refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IFieldInfo`[]\>

## Examples

```typescript
// get web fields
const webFields = useFields();

// get list fields
const listFields = useFields({
	list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});

// get list fields by list title with query
const listFields = useFields({
	list: "My List Title",
	query:{
		select: ["InternalName", "Title", "Id"]
	}
});
```