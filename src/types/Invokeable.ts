import { IWeb } from "@pnp/sp/webs/types";
import { IFetchOptions } from "@pnp/common";
import { SharepointQueryable } from "./SharepointQueryable";

export type InvokableFactory<TResult, TContext extends SharepointQueryable = SharepointQueryable> = (web: IWeb) => Invokable<TResult, TContext>;

export interface Invokable<TResult, TContext extends SharepointQueryable> 
{
    invoke: <Type = TResult>(options?: IFetchOptions) => Promise<Type>;
    instance: TContext;
}