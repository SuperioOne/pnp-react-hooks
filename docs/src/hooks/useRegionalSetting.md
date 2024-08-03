# useRegionalSetting

```typescript
useRegionalSetting(
  options?: RegionalSettingOptions,
  deps?: any[]): IRegionalSettingsInfo | null | undefined;
```

Returns site regional settings.

## Examples

Get regional settings,
```typescript
const regionalSettings = useRegionalSetting();
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `RegionalSettingOptions` | useRegionalSettings hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

