# useNavigation

```typescript
useNavigation(
	options?: NavigationOptions,
	deps?: any[]): INavNodeInfo[] | null | undefined;
```

Returns web navigation nodes. Use `NavigationOptions.type` property to change navigation type. Default is `topNavigation`.

## Examples

Get top navigation nodes,
```typescript
const topNav = useNavigation();

// Explicit type
const topNav = useNavigation({
	type: "topNavigation"
});
```

Get quick launch navigation nodes,
```typescript
const quickLaunch = useNavigation({
	type: "quickLaunch"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `NavigationOptions` | useNavigation hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

