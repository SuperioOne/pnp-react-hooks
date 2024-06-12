
## Definition

▸ **useNavigation**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`INavNodeInfo`[]\>

Returns web navigation nodes. Use [`NavigationOptions.type`](../Interfaces/NavigationOptions.md#type) property to change navigation type. Default is `"topNavigation"`.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`NavigationOptions`](../Interfaces/NavigationOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useNavigation refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`INavNodeInfo`[]\>

## Examples

```typescript
// basic usage
const topNav = useNavigation();

// Same result as 'useNavigation()'
const topNav = useNavigation({
	type: "topNavigation"
});

// get quick launch navigation nodes
const quickLaunch = useNavigation({
	type: "quickLaunch"
});
```