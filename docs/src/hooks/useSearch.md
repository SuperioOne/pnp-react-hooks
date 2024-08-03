# useSearch

```typescript
useSearch(
        searchQuery: string | ISearchQuery,
        options?: SearchOptions,
        deps?: any[]): [`SpSearchResult` | null | undefined, `GetPageDispatch`]
```

Conduct search on SharePoint.

## Examples

Basic search,
```typescript
const [results, setPage] = useSearch("search text");

// load next page
setPage(2);

// load page with callback
setPage(3, () => alert("Page Loaded!"));
```

Advanced search,
```typescript
const query = {
        Querytext: "*",
        RowLimit: 5,
        RowsPerPage: 5,
        SelectProperties: ["Title"]
};

// Using dependency list to react query property changes.
const [results, setPage] = useSearch(query, undefined, [query?.Querytext]);
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `searchQuery` | `string` \| `ISearchQuery` | Search query object or search text | Yes for `string`, No for `ISearchQuery` |
| `options?` | `SearchOptions` | useSearch hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

