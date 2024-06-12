
## Definition

▸ **useRecycleBinItems**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRecycleBinItemObject`[]\>

Returns all recycle bin items.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RecycleBinItemsOptions`](../Interfaces/RecycleBinItemsOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useRecycleBinItems refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRecycleBinItemObject`[]\>

## Examples

### Web recycle bin items

```typescript
// basic usage
const items = useRecycleBinItems();

// Same as useRecycleBinItems()
const items = useRecycleBinItems({
    scope: "web"
});

// with OData query
const items = useRecycleBinItems({
    query: {
        top: 2,
        select: ["Title", "ItemState"],
    }
});
```

### Site recycle bin items

```typescript
// basic usage
const items = useRecycleBinItems({
    scope: "site"
});

// with OData query
const items = useRecycleBinItems({
    scope: "site",
    query: {
        top: 2,
        select: ["Title", "ItemState"],
    }
});
```