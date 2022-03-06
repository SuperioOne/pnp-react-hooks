[API](../index.md) / [Sp](../index.md#sp) / useRegionalSetting

## Definition

▸ **useRegionalSetting**(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IRegionalSettingsInfo`\>

Returns site regional settings.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RegionalSettingOptions`](../Interfaces/RegionalSettingOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useRegionalSetting will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IRegionalSettingsInfo`\>

## Examples

```typescript
// basic usage
const regionalSettings = useRegionalSetting();
```