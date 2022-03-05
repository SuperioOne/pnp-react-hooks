[API](API/index.md) / [Sp](API/index.md#sp) / useSubWebInfos

## Definition

▸ **useSubWebInfos**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IWebInfosData`[]\>

Returns web info collection of current web's subwebs.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SubWebInfosOptions`](useSubWebInfos.md#subwebinfosoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useSubWebInfos will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IWebInfosData`[]\>

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
