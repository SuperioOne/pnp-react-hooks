# useApps

```typescript
useApps<T>(options?:WebAppsOptions, deps?:any[]): T[] | null | undefined;
```

Returns app detail collection from the app catalog.

## Examples

Get apps from site collection app catalog,
```typescript
const apps = useApps();
```
Get apps from tenant app catalog,
```typescript
const apps = useApps({
  scope: "tenant"
});
```
Set scope to site collection explicitly,
```typescript
const apps = useApps({
  scope: "sitecollection"
});
```
Get apps from site collection app catalog with query,
```typescript
const filteredApps = useApps({ 
  query: { 
    select: ["Title", "Id", "IsEnabled"],
    filter: "IsEnabled eq true" 
  }
});
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `options?` | `WebAppsOptions` | useApps hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

