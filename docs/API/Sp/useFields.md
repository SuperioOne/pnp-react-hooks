[API](API/index.md) / [Sp](API/index.md#sp) / useFields

## Definition

▸ **useFields**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IFieldInfo`[]\>

Returns field collection from web or list. List option can be defined in [`FieldsOptions.list`](FieldsOptions.md#list) property.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`FieldsOptions`](FieldsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useFields will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IFieldInfo`[]\>

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