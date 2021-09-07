import { IFetchOptions } from "@pnp/common";

export interface PnpActionFunction<TContext, TResult>
{
    (this: TContext, options?: IFetchOptions): Promise<TResult>;
}
