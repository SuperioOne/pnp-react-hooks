import { Guid } from "../utils";

export interface ListQuery extends Record<string, unknown>
{
    list: string | Guid;
}