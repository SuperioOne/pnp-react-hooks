## Definition

▸ **useViews**(`listId`,`options?`,`deps?`): [`Nullable`](../Types/NullableT.md)<`IViewInfo[]`\>

Returns list view collection.

## Parameters

| Name       | Type                                            | Description                                                                           |
| :--------- | :---------------------------------------------- | :------------------------------------------------------------------------------------ |
| `listId`   | `string`                                        | List GUID id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ViewsOptions`](../Interfaces/ViewsOptions.md) | PnP hook options.                                                                     |
| `deps?`    | `DependencyList`                                | useSite refreshes response data when one of the dependencies changes.                     |

## Returns

[`Nullable`](../Types/NullableT.md)<`IViewInfo[]`\>

## Examples

```typescript
// get list views
const allViews = useViews("9db07c1f-7880-4601-99d0-1c39c43f6599");

// with query
const viewTitles = useView("My List", {
	query: {
		select: ["Title"],
        top: 5
	}
});
```
