import ToolTip from '@site/src/components/tooltip';

## Hierarchy

- [`ErrorOptions`](ErrorOptions.md)

- [`RenderOptions`](RenderOptions.md)

- [`ContextOptions`](ContextOptions.md)

- [`BehaviourOptions`](BehaviourOptions.md)

  ↳ **`FolderTreeOptions`**

## Properties

### behaviors

• `Optional` **behaviors**: `TimelinePipe`<`any`\>[]

Additional behaviors for hooks PnP request.

#### Inherited from

[BehaviourOptions](BehaviourOptions.md).[behaviors](BehaviourOptions.md#behaviors)

___

### disabled

• `Optional` **disabled**: [`DisableOptionValueType`](../Types/DisableOptionType.md#disableoptionvaluetype) \| (`rootFolderRelativeUrl`: `string`) => `boolean`

Disable hook calls and renders.

#### Overrides

[RenderOptions](RenderOptions.md).[disabled](RenderOptions.md#disabled)

___

### error

• `Optional` **error**: [`ErrorFunc`](../Types/ErrorFunc.md#errorfunc) \| [`ErrorMode`](../Enums/ErrorMode.md)

Error handling. Default is [`ErrorMode.Default`](../Enums/ErrorMode.md#default).

#### Inherited from

[ErrorOptions](ErrorOptions.md).[error](ErrorOptions.md#error)

___

### fileQuery

• `Optional` **fileQuery**: [`ODataQueryableCollection`](ODataQueryableCollection.md)

OData query options for files. <ToolTip text="Changing the value repeats request">🚩</ToolTip>

___

### folderFilter

• `Optional` **folderFilter**: `string`

Folder filter query. <ToolTip text="Changing the value repeats request">🚩</ToolTip>

___

### keepPreviousState

• `Optional` **keepPreviousState**: `boolean`

Keep previous state until new request is resolved rather than clearing the state as `undefined`. Default is `false`.

#### Inherited from

[RenderOptions](RenderOptions.md).[keepPreviousState](RenderOptions.md#keeppreviousstate)

___

### sp

• `Optional` **sp**: `SPFI`

Pnp SP context. <ToolTip text="Changing sp value repeats request">🚩</ToolTip>


#### Inherited from

[ContextOptions](ContextOptions.md).[sp](ContextOptions.md#sp)