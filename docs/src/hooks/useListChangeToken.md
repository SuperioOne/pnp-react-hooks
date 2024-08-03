# useListChangeToken

```typescript
useListChangeToken(
        list: string,
        options?: ListTokenOptions,
        deps?: any[]): IChangeTokenInfo | null | undefined;
```

Returns lists current change token and last modified dates.

## Examples

Get list change tokens,
```typescript
const changeDetails = useListChangeToken("5ee53613-bc0f-4b2a-9904-b21afd8431a7");

const changeDetails = useListChangeToken("My List Title");
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `list` | `string` | List UUID or title | Yes |
| `options?` | `ListTokenOptions` | useListChangeToken hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |


## Remarks

You can also use [`useList`](./useList.md) to get exact same change info.

```typescript
const listInfo = useList("5ee53613-bc0f-4b2a-9904-b21afd8431a7", {
    query: {
        select: [
             "CurrentChangeToken",
             "LastItemDeletedDate",
             "LastItemModifiedDate",
             "LastItemUserModifiedDate" ]
    }
});
```
