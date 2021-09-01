import { _SharePointQueryableInstance } from "@pnp/sp/sharepointqueryable";
import { IWeb } from "@pnp/sp/webs/types";

export type RequestAction<T> = (web: IWeb) => _SharePointQueryableInstance<T>;