
## Definition

▸ **useRegionalSetting**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRegionalSettingsInfo`\>

Returns site regional settings.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RegionalSettingOptions`](../Interfaces/RegionalSettingOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useRegionalSetting refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRegionalSettingsInfo`\>

## Examples

```typescript
// basic usage
const regionalSettings = useRegionalSetting();
```