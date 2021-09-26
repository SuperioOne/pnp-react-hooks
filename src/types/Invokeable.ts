import { IWeb } from "@pnp/sp/webs/types";
import { SharepointQueryable } from "./SharepointQueryable";

export type InvokableFactory<TContext extends SharepointQueryable = SharepointQueryable> = (web: IWeb) => Promise<TContext>;
