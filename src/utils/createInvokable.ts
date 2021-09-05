import { IFetchOptions } from "@pnp/common";
import { Invokable, SharepointQueryable } from "../types";

export function createInvokable<TResult, TContext extends SharepointQueryable = SharepointQueryable>(instance: TContext): Invokable<TResult, TContext>;
export function createInvokable<TResult, TContext extends SharepointQueryable = SharepointQueryable>(instance: TContext, func: (options?: IFetchOptions) => Promise<TResult>): Invokable<TResult, TContext>;
export function createInvokable<TResult, TContext extends SharepointQueryable = SharepointQueryable>(instance: TContext, func?: (options?: IFetchOptions) => Promise<TResult>): Invokable<TResult, TContext>
{
    const result = (func ?? instance) as Invokable<TResult, TContext>;
    result.__instance = instance;

    return result;
}