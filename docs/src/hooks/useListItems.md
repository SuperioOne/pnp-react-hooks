---
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import ToolTip from '@site/src/components/tooltip';

## Definition
Returns all item collection from specified list.

## Overloads

### useListItems `AllItemsOptions`

▸ **useListItems**<`T`\>(`list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`[]\>

Returns all item collection from specified list.

:::info

This mode allows you to fetch items over 5000 threshold but you can't use sort, top and skip query options.

:::

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`AllItemsOptions`](../Interfaces/AllItemsOptions.md) | PnP hook options for all items request. |
| `deps?` | `DependencyList` | useListItems refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`T`[]\>

#### Examples

```typescript
// you can provide a type (optional)
export interface MyItem
{
	Id: number;
	Title: string;
	Created: string;
	Modified: string;
	Author : {
		Title: string;
	}
}

// basic usage
const items = useListItems("My List Title", {
	mode: ListOptions.All // 1
});

// with query and type information
const myItems = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	},
	mode: ListOptions.All // 1
});
```


------------


### useListItems `ListItemsOptions`

▸ **useListItems**<`T`\>(`list`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`[]\>

Returns item collection from specified list.

:::caution

`useListItems` may fail in this mode, if query result exceeds list threshold *(5000)*. See [MSDocs SharePoint Large Libraries](https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint) for how to handle large libraries with indexes and filtering.

:::

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`ListItemsOptions`](../Interfaces/ListItemsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useListItems refreshes response data when one of the dependencies changes. |

#### Returns

[`Nullable`](../Types/NullableT.md)<`T`[]\>

#### Examples

```typescript
// you can provide a type (optional)
export interface MyItem
{
	Id: number;
	Title: string;
	Created: string;
	Modified: string;
	Author : {
		Title: string;
	}
}

// basic usage, 'mode' option can be left undefined.
const items = useListItems("My List Title");

// with query and type information
const myItems = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	},
	mode: ListOptions.Default // 0
});
```

------------


### useListItems `PagedItemsOptions`

▸ **useListItems**<`T`\>(`list`, `options?`, `deps?`): [[`Nullable`](../Types/NullableT.md)<`T`[]\>, [`nextPageDispatch`](../Types/NextPageDispatch.md), `boolean`]

Returns item collection from specified list with paging support.

:::warning

Paged mode only support forward iteration. Reverse paging does not supported by REST API.

:::

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `string` | List GUID Id or title. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`PagedItemsOptions`](../Interfaces/PagedItemsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useListItems refreshes response data when one of the dependencies changes. |

#### Returns

[ [`Nullable`](../Types/NullableT.md)<`T`[]\>, [`nextPageDispatch`](../Types/NextPageDispatch.md), `boolean` ]

#### Examples

```typescript
// you can provide a type (optional)
export interface MyItem
{
	Id: number;
	Title: string;
	Created: string;
	Modified: string;
	Author : {
		Title: string;
	}
}

const [items, nextPage, hasNext] = useListItems("My List Title", {
	mode: ListOptions.Paged
});

// with query and type information
const [items, nextPage, hasNext] = useListItems<MyItem>("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
	query: {
		select: ["Title", "Id", "Author/Title", "Created", "Modified"],
		expand: ["Author"]
	},
	mode: ListOptions.Paged // 2
});

// You can get next page with dispatch function.
if(hasNext)
{
	nextPage();

	// Optionally pass a callback function.
	nextPage(() => console.debug("Next page fetched."));
}
```