# useSite

```typescript
useSite(options?: SiteInfoOptions, deps?: any[]): ISiteInfo | null | undefined;
```

Returns current site info.

## Examples

Get site info details,
```typescript
const siteInfo = useSite();
```

Query site info details,
```typescript
const site = useSite({
	query: {
		select: ["Title", "Id"]
	}
});
```
## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `SiteInfoOptions` | useSite hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

