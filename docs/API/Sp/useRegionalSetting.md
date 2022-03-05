[API](API/index.md) / [Sp](API/index.md#sp) / useRegionalSetting

## Definition

▸ **useRegionalSetting**(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`IRegionalSettingsInfo`\>

Returns site regional settings.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`RegionalSettingOptions`](useRegionalSetting.md#regionalsettingoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useRegionalSetting will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`IRegionalSettingsInfo`\>

## Examples

```typescript
// basic usage
const regionalSettings = useRegionalSetting();
```