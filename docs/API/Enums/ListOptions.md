## Definition

Defines how [`useListItems`](../Sp/useListItems) get items from Sharepoint.

## Enumeration members

### Paged

• **Paged** = `2`

Fetch list items with paging support.

___

### All

• **All** = `1`

Fetch data in multiple calls and merges the results on the client side.

:::caution

`orderBy`, `top` and `skip` query parameters are not allowed on this mode.

:::

___

### Default

• **Default** = `0`

Fetch data in single request. Request might fail due to threshold limit, if data is not indexed and filtered properly.

:::tip

See [docs.microsoft](https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint) for how to handle large libraries.

:::
