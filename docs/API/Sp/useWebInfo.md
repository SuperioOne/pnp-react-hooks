[API](../index.md) / [Sp](../index.md#sp) / useWebInfo

## Definition

▸ **useWebInfo**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IWebInfo`\>

Returns current web.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebInfoOptions`](../Interfaces/WebInfoOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useWebInfo will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IWebInfo`\>

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
