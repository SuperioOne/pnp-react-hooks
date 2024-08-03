# useFields

```typescript
useFields(
	options?: FieldsOptions, 
	deps?: any[]): IFieldInfo[] | null | undefined;
```

Returns field collection from web or list. Use `FieldsOptions.list` property to set target list.

## Examples

Get web fields,
```typescript
const webFields = useFields();
```

Get list fields,
```typescript
const listFields = useFields({
	list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});
```

Query fields,
```typescript
const listFields = useFields({
	list: "My List Title",
	query:{
		select: ["InternalName", "Title", "Id"]
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `FieldsOptions` | useFields hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

