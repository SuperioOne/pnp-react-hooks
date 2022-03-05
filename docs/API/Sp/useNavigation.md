[API](API/index.md) / [Sp](API/index.md#sp) / useNavigation

## Definition

▸ **useNavigation**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`INavNodeInfo`[]\>

Returns web navigation nodes. Use [`NavigationOptions.type`](NavigationOptions.md#type) property to change navigation type. Default is `topNavigation`.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`NavigationOptions`](NavigationOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useNavigation will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`INavNodeInfo`[]\>

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