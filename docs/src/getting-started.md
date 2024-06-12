# Getting Started

## SPFx

1. Install `pnp-react-hooks` and `@pnp/sp` packages to your [SPFx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) webpart project.

```shell
npm install pnp-react-hooks @pnp/sp
```

2. Update module imports, `onInit()` and `render()` functions on `<YourWebpartName>.tsx` file.

**PnpReactHookExamplesWebPart.ts**
```typescript showLineNumbers
// <Other Webpart imports>
// Import pnp-react-hooks helper function and option type
// highlight-next-line
import { PnpHookGlobalOptions, createProviderElement } from 'pnp-react-hooks';
// import PnPjs
// highlight-next-line
import { spfi, SPFx} from '@pnp/sp';

export default class PnpReactHookExamplesWebPart extends BaseClientSideWebPart<IPnpReactHookExamplesWebPartProps>
{
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _theme: IReadonlyTheme;
  // highlight-next-line
  private _hookOptions: PnpHookGlobalOptions;

  // Create onInit function to initialize options.
  protected onInit(): Promise<void>
  {
    return this._getEnvironmentMessage().then(message =>
    {
      this._environmentMessage = message;
	    // Initialize PnPjs sp context.
      // highlight-next-line
      const sp = spfi().using(SPFx(this.context));

      // Setup your default PnP React hooks options.
      // highlight-start
      this._hookOptions = {
        sp: sp,
        disabled: "auto"
      };
     // highlight-end
    });
  }

  public render(): void
  {
    const element: React.ReactElement<IPnpReactHookExamplesProps> = React.createElement(
      PnpReactHookExamples,
      {
        description: this.properties.description,
      }
    );

    // Use helper function to create React elements.
    // highlight-next-line
    const rootElement = createProviderElement(this._hookOptions, element);

    // Render root element.
    // highlight-next-line
    ReactDom.render(rootElement, this.domElement);
  }

}
```

3. Start using hooks in your webpart components.

**PnpReactHookExamples.tsx**
```tsx
import * as React from 'react';
import { IPnpReactHookExamplesProps } from './IPnpReactHookExamplesProps';
import { useCurrentUser } from "pnp-react-hooks";

const PnpReactHookExamples = (props: IPnpReactHookExamplesProps) =>
{
	const me = useCurrentUser({
		query: {
			select: ["Title"]
		}
	});

	return (
		<div>{me?.Title}</div>
	);
};

export default PnpReactHookExamples;
```
