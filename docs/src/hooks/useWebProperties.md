# useWebProperties

```typescript
useWebProperties<T>(options?: WebPropertiesOptions, deps?: any[]): T | null | undefined;
```

Returns webs properties.

## Examples

Get web properties,
```typescript
const webPropertyBag = useWebProperties();
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `WebPropertiesOptions` | useWebProperties hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

