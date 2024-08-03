# useContentTypes

```typescript
useContentTypes(
  options?: ContentTypeOptions,
  deps?: any[]): IContentTypeInfo[] | null | undefined;
```

Returns content types of web or list. Use `ContentTypeOptions.list` property to get list content types instead of web content types.

## Examples

Get web content types,
```typescript
const webContentTypes = useContentTypes();
```

Get list content types by list Id,
```typescript
const listContentTypes = useContentTypes({
  list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});
```

Get list content types by list title,
```typescript
const listContentTypes = useContentTypes({
  list: "My List Title"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `ContentTypeOptions` | useContentTypes hook options. | Partially |
| `deps?` | `DependencyList` | Hook dependency list | Yes |

