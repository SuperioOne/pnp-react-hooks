import { SPFI } from "@pnp/sp";
import { SharepointQueryable } from "./SharepointQueryable";

export type InvokableFactory<TContext extends SharepointQueryable = SharepointQueryable> = (sp: SPFI) => Promise<TContext>;
