# PnP React Hooks

PnP React Hooks is a wrapper library for [PnPjs](https://pnp.github.io/pnpjs/) providing configurable custom React hooks for Sharepoint Rest API.

**Usage:**

```tsx
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

	return (<ul> { items?.map(item => (<li key={item.Id}>{item.Title}</li>)) } </ul>);
};
```

## Installation

### Npm  v7+

```cmd
npm install pnp-react-hooks
```

### Npm v3-6

You have to install peer dependencies manually when using older npm versions.

```cmd
npm install pnp-react-hooks @pnp/sp react
```

## Disclaimer

**PnP React Hooks library is an open source project under MIT license. It's NOT an official package distributed by Microsoft.**