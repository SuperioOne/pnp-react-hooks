import { ExceptionOptions } from "./ExceptionOptions";
import { Nullable } from "../NullableT";
import { RenderOptions } from "./RenderOptions";
import { WebOptions } from "./WebOptions";

export interface PnpHookOptions<T> extends ExceptionOptions, RenderOptions, WebOptions
{
    query?: Nullable<T>;
}

export { ExceptionMode, ExceptionOptions } from "./ExceptionOptions";
export { LoadActionMode, RenderOptions } from "./RenderOptions";
export { WebOptions } from "./WebOptions";