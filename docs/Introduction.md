---
id: home-page
sidebar_position: 1
title: Introduction
slug: /
---

# PnP React Hooks

PnP React Hooks is a wrapper library for [PnPjs](https://pnp.github.io/pnpjs/) providing configurable custom React hooks for Sharepoint Rest API.

**Example usage:**

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

	return (<ul>
			{ items?.map(item => (<li key={item.Id}>{item.Title}</li>)) }
			</ul>);
};
```

## Quick Install

### Npm  v7+

```cmd
npm install pnp-react-hooks
```

### Npm v3-6

You have to install peer dependencies manually when using older npm versions.

```cmd
npm install pnp-react-hooks @pnp/sp react
```

## Features

- Quickly build simple webparts with less code.
- Written in Typescript. No additional type package required.
- Automatically tracks variable changes and re-fetch data when needed.
- Easy to treeshake unused code with modern bundlers.
- Can be configured for multiple sites via context provider.
- Supports [PnPjs V3 behaviors](https://pnp.github.io/pnpjs/core/behaviors/).

## Questions and Suggestions

 If you find any issue or have a suggestion on how project can be improved feel free to create an issue on [Github](https://github.com/SuperioOne/pnp-react-hooks/issues).