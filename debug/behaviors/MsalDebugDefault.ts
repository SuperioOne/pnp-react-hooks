import { DefaultHeaders } from "@pnp/sp/behaviors/defaults";
import { ISPDefaultProps } from "@pnp/nodejs/behaviors/spdefault";
import { Logger } from "./Logger";
import { MSAL } from "@pnp/nodejs/behaviors/msal";
import { NodeFetchWithRetry } from "@pnp/nodejs/behaviors/fetch";
import { Queryable, RejectOnError, ResolveOnData, DefaultParse } from "@pnp/queryable";
import { TimelinePipe, combine } from "@pnp/core";
import { isUrl, UrlType } from "../../src/utils/isUrl";

export function MsalDebugDefault(props: ISPDefaultProps): TimelinePipe<Queryable>
{
    if (props.baseUrl && !isUrl(props.baseUrl, UrlType.Absolute))
    {
        throw Error("props.baseUrl must be absolute Url.");
    }

    return (instance: Queryable) =>
    {
        instance.on.pre(async (url, init, result) =>
        {
            init.cache = "no-cache";
            init.credentials = "same-origin";

            return [url, init, result];
        });

        instance.using(
            MSAL(props.msal.config, props.msal.scopes),
            DefaultHeaders(),
            RejectOnError(),
            ResolveOnData(),
            Logger(),
            NodeFetchWithRetry(),
            DefaultParse());

        instance.on.pre.prepend(async (url, init, result) =>
        {
            if (!isUrl(url, UrlType.Absolute))
            {
                url = combine(props.baseUrl, url);
            }

            return [url, init, result];
        });

        return instance;
    };
}