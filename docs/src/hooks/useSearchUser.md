import ToolTip from '@site/src/components/tooltip';

## Definition

▸ **useSearchUser**(`searchOptions`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IPeoplePickerEntity`[]\>

Searches for users or groups with specified search options.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchOptions` | `string` \| `IClientPeoplePickerQueryParameters` | Search text or search query parameters. <ToolTip text="Changing the value refreshes response data.">🚩</ToolTip> |
| `options?` | [`SearchUserOptions`](../Interfaces/SearchUserOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSearchUser refreshes response data when one of the dependencies changes. |

## Returns

[`Nullable`](../Types/NullableT.md)<`IPeoplePickerEntity`[]\>

## Examples

**text search**

```typescript
// basic usage
const searchResults = useSearchUser("Mark");
```

**with query**

```typescript
const [query, setQuery] =  React.useState<IClientPeoplePickerQueryParameters>({
    AllowEmailAddresses: true,
    AllowMultipleEntities: true,
    MaximumEntitySuggestions: 25,
    PrincipalType: PrincipalType.All,
    QueryString: "query text"
});

// with query
const searchResults = useSearchUser(query);
```