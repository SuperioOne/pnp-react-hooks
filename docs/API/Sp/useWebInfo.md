[API](API/index.md) / [Sp](API/index.md#sp) / useWebInfo

## Definition

▸ **useWebInfo**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IWebInfo`\>

Returns current web.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebInfoOptions`](useWebInfo.md#webinfooptions) | PnP hook options. |
| `deps?` | `DependencyList` | useWebInfo will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IWebInfo`\>

## Examples

```typescript
// basic usage
const currentWeb = useWebInfo();

// query
const currentWeb = useWebInfo({
	query:{
		select: ["Title"]
	}
});
```
