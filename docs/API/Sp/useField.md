[API](API/index.md) / [Sp](API/index.md#sp) / useField

## Definition

▸ **useField**(`fieldId`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IFieldInfo`\>

Returns a field from web or list. List option can be defined in [`FieldOptions.list`](FieldOptions.md#list) property.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fieldId` | `string` | Field internal name or Id. Changing the value resends request. |
| `options?` | [`FieldOptions`](FieldOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useField will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IFieldInfo`\>

## Examples

```typescript
// get field info by field Id
const field = useField("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

// get field info by field internal name
const textField = useField("textFieldInternalName");

// get list field info
const listField = useField("listFieldInternalName", {
	list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});
```
