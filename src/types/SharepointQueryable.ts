import { _SPCollection, _SPQueryable } from "@pnp/sp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SharepointQueryable<T = any> = _SPCollection<T> | _SPQueryable<T>;