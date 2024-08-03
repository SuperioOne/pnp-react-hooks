# useSubWebInfos

```typescript
useSubWebInfos(
	options?: SubWebsOptions, 
	deps?: any[]): IWebInfosData[] | null | undefined;
```

Returns web info collection of current webs sub-webs.

## Examples

Get all sub sites,
```typescript
const subSites = useSubWebInfos();
```

Query sub sites,
```typescript
const filteredSubSites = useSubWebInfos({
	query: {
		select: ["Title", "Id", "ServerRelativeUrl"],
		filter: "WebTemplate eq 'STS'"
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `SubWebsOptions` | useSubWebs hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

