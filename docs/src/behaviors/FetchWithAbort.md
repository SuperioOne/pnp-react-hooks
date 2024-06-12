## Definition

▸ **FetchWithAbort**( `props?`)

Custom fetch behavior for auto consecutive request aborting.

:::warning

**FetchWithAbort** behavior relies on browsers built-in [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).  Make sure your target browsers supports `AbortController`.

:::

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props?` | [`RetryOptions`](../Interfaces/RetryOptions.md) | Custom fetch retry options. |

## Examples

```typescript
// basic usage
spfi().using(SPFx(this.context), FetchWithAbort());

// with parameters
spfi().using(SPFx(this.context), FetchWithAbort({
	retry: 3,      // retry count
	waitTime: 500  // wait time for each retry in miliseconds
}));
```