import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **usePageComments**(`pageRelativePath`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

Returns comment collection from page.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageRelativePath` | `string` | Page server relative path. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`PageCommentsOptions`](../Interfaces/PageCommentsOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | usePageComments refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`ICommentInfo`[]\>

## Examples

```typescript
// basic usage
const pageComments = usePageComments("/sites/mysite/Pages/Home.aspx");
```
