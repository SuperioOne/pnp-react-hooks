# usePageComments

```typescript
usePageComments(
  pageRelativePath: string,
  options?: PageCommentsOptions,
  deps?: any[]): ICommentInfo[] | undefined | null;
```

Returns comment collection from page.

## Examples

Get page comments,
```typescript
const pageComments = usePageComments("/sites/mysite/Pages/Home.aspx");
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `pageRelativePath` | `string` | Page server relative path | Yes |
| `options?` | `PageCommentsOptions` | useApps hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

