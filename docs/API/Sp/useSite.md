[API](API/index.md) / [Sp](API/index.md#sp) / useSite

## Definition

▸ **useSite**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ISiteInfo`\>

Returns current site info.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`SiteInfoOptions`](useSite.md#siteinfooptions) | PnP hook options. |
| `deps?` | `DependencyList` | useSite will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ISiteInfo`\>

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
