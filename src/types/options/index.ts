import { ExceptionOptions } from "./ExceptionOptions";
import { Nullable } from "../utilityTypes";
import { RenderOptions } from "./RenderOptions";
import { WebOptions } from "./WebOptions";
import { CacheOptions } from "./CacheOptions";

export interface PnpHookOptions<T> extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    query?: Nullable<T>;
}

export { CacheOptions } from "./CacheOptions";
export { ExceptionMode, ExceptionOptions } from "./ExceptionOptions";
export { ListOptions } from "./ListOptions";
export { LoadActionOption as LoadActionMode, RenderOptions } from "./RenderOptions";
export { WebOptions } from "./WebOptions";