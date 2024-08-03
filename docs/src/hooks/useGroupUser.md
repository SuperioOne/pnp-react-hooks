# useGroupUser

```typescript
useGroupUser(
  groupId: string | number,
  userId: string | number,
  options?: GroupUserOptions,
  deps?: any[]): ISiteUserInfo | null | undefined;
```

Returns an user from specific group user collection.

## Examples

```typescript
const groupUser = useGroupUser(10, 27);

const groupUser = useGroupUser("My SharePoint Group", 27);

const groupUser = useGroupUser("My SharePoint Group", "user@example.onmicrosoft.com");

const groupUser = useGroupUser("My SharePoint Group", "i:0#.f|membership|user@example.onmicrosoft.com");
```

## Parameters

| Name | Type | Description | Tracked for changes |
| :------ | :------ | :------ | :--------|
| `groupId` | `string` \| `number` | Group name or Id | Yes |
| `userId` | `string` \| `number` | User email, login name or Id | Yes |
| `options?` | `WebAppsOptions` | useApps hook options | Partially |
| `deps?` | `DependencyList` | Hook dependency list. | Yes |

