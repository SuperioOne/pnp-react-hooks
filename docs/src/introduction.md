# PnP React Hooks

PnP React Hooks is a wrapper library for [PnPjs](https://pnp.github.io/pnpjs/), provides configurable React hooks for SharePoint Rest API.

**Example usage:**

```jsx
import * as React from "react";
import { useListItems, useCurrentUser } from "pnp-react-hooks";

export const ExampleComponent = () =>
{
	const currentUser = useCurrentUser();

	const items = useListItems("My List", {
		query: {
			select: ["Title", "Id", "Author/Title"],
			expand: ["Author"],
			filter: `Author eq ${currentUser?.Id}`
		},
		disabled: !currentUser
	});

	return (<ul>
		{items?.map(item => (<li key={item.Id}>{item.Title}</li>))}
	</ul>);
};
```

## Installation

<Tabs>
<TabItem value="npmv7" label="npm v7+" default>

Peer dependencies are automatically installed by npm.

```shell
npm install pnp-react-hooks
```

</TabItem>
<TabItem value="npmv3" label="npm v3-6">



```shell
npm install pnp-react-hooks @pnp/sp react@17.0.2
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```shell
pnpm install pnp-react-hooks @pnp/sp react@17.0.2
```

</TabItem>

<TabItem value="yarn" label="yarn">

```shell
yarn add pnp-react-hooks @pnp/sp react@17.0.2
```

</TabItem>
</Tabs>

## Features

- Build simple web parts quickly with less code.
- Written in TypeScript, no additional type package required.
- Automatically tracks parameter changes and refreshes data as needed.
- Easy to treeshake unused code with modern JS bundlers.
- Can be configured for multiple sites with an option provider.
- Supports [PnPjs V3 behaviors](https://pnp.github.io/pnpjs/core/behaviors/).

## Questions and Suggestions

 If you find any issue or have a suggestion on how project can be improved feel free to create an issue on [Github](https://github.com/SuperioOne/pnp-react-hooks/issues).
