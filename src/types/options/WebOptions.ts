import { IWeb } from "@pnp/sp/webs/types";

export interface WebOptions extends Record<string, unknown>
{
    web?: IWeb | string;
}