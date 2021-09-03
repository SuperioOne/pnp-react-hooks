import { IFetchOptions } from "@pnp/common";
import { Invokable, SharepointQueryable } from "../types";

export function createInvokable<T, TCtx extends SharepointQueryable = SharepointQueryable>(instance: TCtx): Invokable<T, TCtx>;
export function createInvokable<T, TCtx extends SharepointQueryable = SharepointQueryable>(instance: TCtx, func: (options?: IFetchOptions) => Promise<T>): Invokable<T, TCtx>;
export function createInvokable<T, TCtx extends SharepointQueryable = SharepointQueryable>(instance: TCtx, func?: (options?: IFetchOptions) => Promise<T>): Invokable<T, TCtx>
{
    const result = (func ?? instance) as Invokable<T, TCtx>;
    result.__instance = instance;

    return result;
}