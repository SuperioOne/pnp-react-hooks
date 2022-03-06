[API](../index.md) / [Sp](../index.md#sp) / useSite

## Definition

▸ **useSite**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ISiteInfo`\>

Returns current site info.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SiteInfoOptions`](../Interfaces/SiteInfoOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSite will resend request when one of the dependencies changed. |

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
