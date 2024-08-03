# useField

```typescript
useField(
   fieldId: string, 
   options?: FieldOptions, 
   deps? any[]): IFieldInfo | null | undefined;
```
Returns a field from web or list.

## Examples

Get web field info,
```js
const webFields = useField("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get list field info,
```js
const listFields = useField("MyCustomFieldInternalName", {
   list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `fieldId` | `string` | Field internal name or Id | Yes |
| `options?` | `FieldOptions` | useField hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

