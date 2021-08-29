import { IFetchOptions } from "@pnp/common";

export type RequestAction<T> = (options?: IFetchOptions) => Promise<T>;