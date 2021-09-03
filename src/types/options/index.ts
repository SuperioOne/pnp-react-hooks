import { ExceptionOptions } from "./ExceptionOptions";
import { Nullable } from "../NullableT";
import { RenderOptions } from "./RenderOptions";
import { WebOptions } from "./WebOptions";
import { CacheOptions } from "./CacheOptions";

export interface PnpHookOptions<T> extends ExceptionOptions, RenderOptions, WebOptions, CacheOptions
{
    query?: Nullable<T>;
}

export { CacheOptions } from "./CacheOptions";
export { ExceptionMode, ExceptionOptions } from "./ExceptionOptions";
export { LoadActionMode, RenderOptions } from "./RenderOptions";
export { WebOptions } from "./WebOptions";