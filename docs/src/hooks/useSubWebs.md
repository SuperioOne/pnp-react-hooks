
## Definition

▸ **useSubWebInfos**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IWebInfosData`[]\>

Returns web info collection of current web's subwebs.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SubWebsOptions`](../Interfaces/SubWebsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSubWebInfos refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IWebInfosData`[]\>

## Examples

```typescript
// basic usage
const subSites = useSubWebInfos();

// with query
const filteredSubSites = useSubWebInfos({
	query: {
		select: ["Title", "Id", "ServerRelativeUrl"],
		filter: "WebTemplate eq 'STS'"
	}
});
```
