# PnP React Hooks

PnP React Hooks is a wrapper library for [PnPjs](https://pnp.github.io/pnpjs/), 
provides configurable React hooks for SharePoint API to speed up 
development for simple SPFx webparts and components.

**Example usage:**

```jsx
import * as React from "react";
import { useListItems, useCurrentUser } from "pnp-react-hooks";

export const ExampleComponent = () => {
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

```shell
npm install pnp-react-hooks @pnp/sp react
```

`@pnp/sp` and `react` packages are peer dependencies.

| Peer dependency  | Supported versions   |
|------------------|----------------------|
| `@pnp/sp`        | 4.1.0 or later       |
| `react`          | 16.9.\* to 18.\*.\*  |

## Features

- Build simple web parts quickly with less code.
- TypeScript support.
- Automatically tracks parameter changes and refreshes data as needed.
- Easy to tree-shake unused code with modern JS bundlers.
- Can be configured for multiple sites with an option provider.
- Supports [PnPjs behaviors](https://pnp.github.io/pnpjs/core/behaviors/).

## Documentation

For more details see the [docs site](https://prh.smdd.dev).

## Disclaimer

**PnP React Hooks library is an open source project under MIT license. It's NOT an official package distributed by Microsoft.**
