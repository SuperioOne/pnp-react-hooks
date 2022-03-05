[API](API/index.md) / [Sp](API/index.md#sp) / useWebProperties

## Definition

▸ **useWebProperties**<`T`\>(`options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`T`\>

Returns web's properties.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | Return type |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`WebPropertiesOptions`](useWebProperties.md#webpropertiesoptions) | PnP hook options. |
| `deps?` | `DependencyList` | useWebProperties will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`T`\>

## Examples

```typescript
// basic usage
const webPropertyBag = useWebProperties();
```