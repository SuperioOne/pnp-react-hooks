# useWebInfo

```typescript
useWebInfo(
	options?: WebInfoOptions,
	deps?: any[]): IWebInfo | null | undefined;
```

Returns current web.

## Examples

Get current web info,
```typescript
const currentWeb = useWebInfo();
```

Query current web properties,
```typescript
const currentWeb = useWebInfo({
	query:{
		select: ["Title"]
	}
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `WebInfoOptions` | useWebInfo hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

