# useChanges

```typescript
useChanges<T>(
    changeQuery: IChangeQuery,
    options?: ChangesOptions,
    deps?: any[]): T[] | null | undefined;
```

Returns web or list change collection. Use `ChangesOptions.list` property to get list changes instead of web changes.

## Examples

Get web changes,
```typescript
const changeQuery = {
    Add:true,
    Alert:true,
    ChangeTokenEnd: { StringValue: "some end token string" },
    ChangeTokenStart: { StringValue: "some start token string" }
};

const webChanges = useChanges(myQuery, undefined, [
    myQuery?.ChangeTokenStart?.StringValue,
    myQuery?.ChangeTokenEnd?.StringValue
]);
```

Get list changes by using list title and UUID,
```typescript
const listChangeQuery = {
    Add:true,
    Update:true,
    Delete:true,
    ChangeTokenEnd: { StringValue: "some end token string" },
    ChangeTokenStart: { StringValue: "some start token string" }
};

// getting list changes by list title
const listChanges = useChanges(
	listChangeQuery,
	{ list: "My List Title" },
	[
		myQuery?.ChangeTokenStart?.StringValue,
		myQuery?.ChangeTokenEnd?.StringValue
	]
);

// getting list changes by list Id
const anotherListChanges = useChanges(
	listChangeQuery,
	{ list: "61ca5ff8-f553-4d51-a761-89225b069a4f" }, 
	[
	    myQuery?.ChangeTokenStart?.StringValue,
	    myQuery?.ChangeTokenEnd?.StringValue
	]
);
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `changeQuery` | `IChangeQuery` | Change query object | No |
| `options?` | `ChangesOptions` | useChanges hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list | Yes |

