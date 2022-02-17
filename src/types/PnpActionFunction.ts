export interface PnpActionFunction<TContext, TResult>
{
    (this: TContext, options?: RequestInit): Promise<TResult>;
}
