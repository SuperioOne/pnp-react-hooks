## Definition

▸ **useWebInfo**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IWebInfo`\>

Returns current web.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebInfoOptions`](../Interfaces/WebInfoOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useWebInfo refreshes response data when one of the dependencies changes. |

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
