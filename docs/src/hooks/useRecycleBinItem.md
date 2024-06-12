import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useRecycleBinItem**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRecycleBinItemObject`\>

 Returns an item from recycle bin.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | `string` | Recycle bin item guid ID. <ToolTip text="Changing the itemId refreshes response data.">🚩</ToolTip>  |
| `options?` | [`RecycleBinItemOptions`](../Interfaces/RecycleBinItemOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useRecycleBinItem refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRecycleBinItemObject`\>

## Examples

### Web recycle bin item

```typescript
// basic usage
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8");

// Same as useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8")
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    scope: "web"
});

// with OData query
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    query: {
        select: ["Title", "ItemState"],
    }
});
```

### Site recycle bin item

```typescript
// basic usage
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    scope: "site"
});

// with OData query
const item = useRecycleBinItem("3e33c760-dfd2-4107-ac4a-838b169ea3d8", {
    scope: "site",
    query: {
        select: ["Title", "ItemState"],
    }
});
```