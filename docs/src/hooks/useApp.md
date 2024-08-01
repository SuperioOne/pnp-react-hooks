# useApp

```typescript
useApp<T>(appId: string, options?:WebAppOptions, deps?: any[]) : T | null | undefined;
```

Returns an app detail of the given Id from the app catalog.

## Examples

Get app from site collection app catalog,
```typescript
const app = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7");
```

Get app from site collection app catalog with query,
```typescript
const appWithQuery = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
  query: {
    select: ["Title", "Id", "IsEnabled"]
  }
});
```

Get app from tenant app catalog,
```typescript
const tenantApp = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
  scope: "tenant"
});
```

Set scope to site collection explicitly, same as setting `scope` to `undefined`,
```typescript
const tenantApp = useApp("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
  scope: "sitecollection"
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `appId` | `string` | App UUID string. | Yes |
| `options?` | `WebAppOptions` | useApp hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |
