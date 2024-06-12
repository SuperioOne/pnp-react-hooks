## Definition

▸ **useFeatures**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IFeatureInfo`[]\>

Returns site or web feature collection. Scope type can be defined in [`FeaturesOptions.scope`](../Interfaces/FeaturesOptions.md#scope) property.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`FeaturesOptions`](../Interfaces/FeaturesOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFeatures refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IFeatureInfo`[]\>

## Examples

```typescript
// web features
const webFeatures = useFeatures();

// site features
const siteFeatures = useFeatures({
	scope: "site"
});
```
