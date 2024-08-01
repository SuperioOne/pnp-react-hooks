# Common Hook Options

Hook option type defines the following common properties:

**disabled:** Disables hook execution if supplied value or predicate result is true.

**query:** OData query parameters supported by resource type. Automatically tracked for changes with deep comparison.

**keepPreviousState:** When enabled, hook does not reset it's current state before sending a request.

**sp:** Overrides PnpJs SPFI instance. Default uses context-provided instance.

**behaviors:** Sets PnpJs pipeline behaviors to each request.

**error:** Error handling mode or custom error callback. Use `0` for throwing error, `1` for ignoring the errors.

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

