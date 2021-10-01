import { _SharePointQueryable, _SharePointQueryableCollection } from "@pnp/sp/sharepointqueryable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SharepointQueryable<T = any> = _SharePointQueryableCollection<T> | _SharePointQueryable<T>;