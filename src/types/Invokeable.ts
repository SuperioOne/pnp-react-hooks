import { IWeb } from "@pnp/sp/webs/types";
import { IFetchOptions } from "@pnp/common";
import { SharepointQueryable } from "./SharepointQueryable";

export type InvokableFactory<TResult, TCtx extends SharepointQueryable = SharepointQueryable> = (web: IWeb) => Invokable<TResult, TCtx>;

export interface Invokable<TResult, TCtx extends SharepointQueryable> 
{
    <Type = TResult>(options?: IFetchOptions): Promise<Type>;
    __instance: TCtx;
}