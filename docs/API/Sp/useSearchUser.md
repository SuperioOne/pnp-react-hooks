
## Definition

▸ **useSearchUser**(`searchOptions`, `options?`, `deps?`): [`Nullable`](../Types/NullableT.md)<`IPeoplePickerEntity`[]\>

Searches for users or groups with specified search options.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchOptions` | `string` \| `IClientPeoplePickerQueryParameters` | Search text or search query parameters. Changing the value resends request. |
| `options?` | [`SearchUserOptions`](../Interfaces/SearchUserOptions.md) | PnP hook options. |
| `deps?` | `DependencyList` | useSearchUser will resend request when one of the dependencies changed. |

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