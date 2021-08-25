import type { IWeb } from "@pnp/sp/webs/types";

export interface SPQuery extends Record<string, unknown>
{
    web?: IWeb | string;
}