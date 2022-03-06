[API](../index.md) / [Sp](../index.md#sp) / useWebProperties

## Definition

▸ **useWebProperties**<`T`\>(`options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`T`\>

Returns web's properties.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebPropertiesOptions`](../Interfaces/WebPropertiesOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useWebProperties will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`\>

## Examples

```typescript
// basic usage
const webPropertyBag = useWebProperties();
```