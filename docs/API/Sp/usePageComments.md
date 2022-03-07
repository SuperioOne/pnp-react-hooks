
## Definition

▸ **usePageComments**(`pageRelativePath`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

Returns comment collection from page.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageRelativePath` | `string` | Page server relative path. Changing the value resends request. |
| `options?` | [`PageCommentsOptions`](../Interfaces/PageCommentsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | usePageComments will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

## Examples

```typescript
// basic usage
const pageComments = usePageComments("/sites/mysite/Pages/Home.aspx");
```
