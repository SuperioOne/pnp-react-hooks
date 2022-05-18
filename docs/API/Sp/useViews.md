import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useViews**(`listId`,`options?`,`deps?`): [`Nullable`](../Types/NullableT.md)<`IViewInfo[]`\>

Returns list view collection.

## Parameters

| Name       | Type                                            | Description                                                                           |
| :--------- | :---------------------------------------------- | :------------------------------------------------------------------------------------ |
| `listId`   | `string`                                        | List GUID id or title. <ToolTip text="Changing the value repeats request">🚩</ToolTip> |
| `options?` | [`ViewsOptions`](../Interfaces/ViewsOptions.md) | PnP hook options.                                                                     |
| `deps?`    | `DependencyList`                                | useSite will resend request when one of the dependencies changed.                     |

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
