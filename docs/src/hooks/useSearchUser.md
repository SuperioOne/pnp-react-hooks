# useSearchUser

```typescript
useSearchUser(
	searchOptions: string | IClientPeoplePickerQueryParameters,
	options?: SearchUserOptions,
	deps?: any[]): IPeoplePickerEntity[] | null | undefined;
```

Searches for users or groups with specified search options.

## Examples

Search user by text,
```typescript
// basic usage
const searchResults = useSearchUser("Mark");
```

Search user by custom query object,
```typescript
const query = {
    AllowEmailAddresses: true,
    AllowMultipleEntities: true,
    MaximumEntitySuggestions: 25,
    PrincipalType: PrincipalType.All,
    QueryString: "query text"
};

const searchResults = useSearchUser(query, undefined, [query?.QueryString]);
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `searchOptions` | `string` \| `IClientPeoplePickerQueryParameters` | Search text or query object | Yes for `string`, No for query object |
| `options?` | `SearchUserOptions` | useSearchUser hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

