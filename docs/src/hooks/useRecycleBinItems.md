# useRecycleBinItems

```typescript
useRecycleBinItems(
    options?: RecycleBinItemsOptions,
    deps?: any[]): IRecycleBinItemObject[] | null | undefined;
```

Returns all recycle bin items.

## Examples

Get web recycle bin items,
```typescript
const items = useRecycleBinItems();

// Explicit scope
const items = useRecycleBinItems({
    scope: "web"
});
```

Get site recycle bin items,
```typescript
const items = useRecycleBinItems({
    scope: "site"
});
```

Query recycle bin items,
```typescript
const items = useRecycleBinItems({
    query: {
        top: 2,
        select: ["Title", "ItemState"],
    }
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `RecycleBinItemsOptions` | useRecyclebinItems hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

