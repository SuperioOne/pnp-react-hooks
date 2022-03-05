[API](API/index.md) / [Sp](API/index.md#sp) / usePageComments

## Definition

▸ **usePageComments**(`pageRelativePath`, `options?`, `deps?`): [`Nullable`](NullableT.md#nullable)<`ICommentInfo`[]\>

Returns comment collection from page.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageRelativePath` | `string` | Page server relative path. Changing the value resends request. |
| `options?` | [`PageCommentsOptions`](PageCommentsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | usePageComments will resend request when one of the dependencies changed. |

## Returns

[`Nullable`](NullableT.md#nullable)<`ICommentInfo`[]\>

## Examples

```typescript
// basic usage
const pageComments = usePageComments("/sites/mysite/Pages/Home.aspx");
```
