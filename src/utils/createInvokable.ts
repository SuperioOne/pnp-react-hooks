import { IFetchOptions } from "@pnp/common";
import { Invokable, SharepointQueryable } from "../types";
import { PnpActionFunction } from "../types";

export function createInvokable<TResult, TContext extends SharepointQueryable = SharepointQueryable>(instance: TContext, func: PnpActionFunction<TContext, TResult>): Invokable<TResult, TContext>
{
    return {
        invoke: func.bind(instance) as <Type = TResult>(options?: IFetchOptions) => Promise<Type>,
        instance: instance
    }
}