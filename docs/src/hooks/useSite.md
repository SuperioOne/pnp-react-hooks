
## Definition

▸ **useSite**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteInfo`\>

Returns current site info.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SiteInfoOptions`](../Interfaces/SiteInfoOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSite refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ISiteInfo`\>

## Examples

```typescript
// basic usage
const siteInfo = useSite();

// with query
const site = useSite({
	query: {
		select: ["Title", "Id"]
	}
});
```
