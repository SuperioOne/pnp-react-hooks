import fetch from "node-fetch";

export function InitGlobalFetch()
{
   global.fetch = <any>fetch;
}