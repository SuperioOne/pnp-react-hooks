# useRecycleBinItem

```typescript
useRecycleBinItem(
    itemId: string,
    options?:RecycleBinItemOptions,
    deps?: any[]): IRecycleBinItemObject` | null | undefined;
```

Returns an item from recycle bin.

## Examples

### Web recycle bin item

Get item from webs recycle bin,
```typescript
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8");

// Explicit scope type
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    scope: "web"
});
```

Get item from site collections recycle bin,
```typescript
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    scope: "site"
});
```

Query recycle bin items properties,
```typescript
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    query: {
        select: ["Title", "ItemState"],
    }
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `itemId` | `string` | Item UUID | Yes |
| `options?` | `WebAppsOptions` | useRecycleBinItem hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

