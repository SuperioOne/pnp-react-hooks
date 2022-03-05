[API](API/index.md) / [Sp](API/index.md#sp) / useFeatures

## Definition

▸ **useFeatures**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IFeatureInfo`[]\>

Returns site or web feature collection. Scope type can be defined in [`FeaturesOptions.scope`](FeaturesOptions.md#scope) property.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`FeaturesOptions`](FeaturesOptions.md) | PnP hook options |
| `deps?` | `DependencyList` | useFeatures will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IFeatureInfo`[]\>

## Examples

```typescript
// web features
const webFeatures = useFeatures();

// site features
const siteFeatures = useFeatures({
	scope: "site"
});
```