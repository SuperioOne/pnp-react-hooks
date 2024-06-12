
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
| `deps?` | `DependencyList` | useWebProperties refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`T`\>

## Examples

```typescript
// basic usage
const webPropertyBag = useWebProperties();
```