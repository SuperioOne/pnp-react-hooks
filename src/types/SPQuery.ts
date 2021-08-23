import type { IWeb } from "@pnp/sp/webs/types";

export interface SPQuery
{
    web?: IWeb | string;
}