# useFeatures

```typescript
useFeatures(
	options?: FeaturesOptions,
	deps?: any[]): IFeatureInfo[] | null | undefined;
```

Returns site or web feature collection. Scope type can be defined in `FeaturesOptions.scope` property.

## Examples

Get web features,
```typescript
const webFeatures = useFeatures();
```

Get site features,
```typescript
const siteFeatures = useFeatures({
	scope: "site"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `FeaturesOptions` | useFeature hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

