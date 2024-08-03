# Common Hook Options

All hook options have the following common properties:

**disabled:** Disables hook execution if supplied value or predicate function result is `true`. It also supports `"auto"` 
which handles the common cases like `null` list name, `undefined` user name etc.

**query:** OData query parameters supported by resource type. Automatically tracked for changes with deep comparison.

For example, the following `query1` and `query2` are considered as equal and they won't cause any re-render.
```typescript
const query1 = {
    select: ["Title", "Id", "Lookup/Id"],
    expand: ["Lookup"]
}

const query2 = {
    expand: ["Lookup"]
    select: ["Id", "Lookup/Id", "Title"],
}
```

**keepPreviousState:** When enabled, hook does not reset it's current state to `undefined` before sending a new request.

**sp:** Overrides PnpJs SPFI instance. Default uses context-provided instance.

**behaviors:** Sets PnpJs pipeline behaviors to each request.

**error:** Error handling mode or custom error callback. Use `ErrorMode.Default` (`0`) for throwing error, `ErrorMode.Suppress` (`1`) for ignoring the errors.

```typescript
type PnpHookOptions = {
    disabled?: "auto" | boolean | (...args[]) => boolean;
    query?: {
        expand?: string[];
        select?: string[];
        // Extra properties are available for collection types.
        top?: number;
        orderBy?: string;
        orderyByAscending?: boolean;
        skip?: number;
        filter?: string;
    },
    keepPreviousState?: boolean;
    sp?: SPFI;
    behaviors?: TimelinePipe<any>[];
    error?: 0 | 1 | (err:Error) => void;
}

