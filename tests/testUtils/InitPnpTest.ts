import config from "../../msalSettings";
import testEnv from "../..//test-env";
import { IHttpClientImpl } from "@pnp/common";
import { MsalFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";
import { PnpCachedHttpClient } from "./PnpCachedHttpClient";

type ClientFactory = () => IHttpClientImpl;

export function InitPnpTest()
{
    let clientFactory: ClientFactory;

    switch (testEnv.cacheMode)
    {
        case "offline":
            clientFactory = () => new PnpCachedHttpClient({
                cacheDir: testEnv.cacheDir,
                offlineOnly: true
            }, config.sp.msal.init, config.sp.msal.scopes);
            break;
        case "if-exists":
            clientFactory = () => new PnpCachedHttpClient({
                cacheDir: testEnv.cacheDir,
            }, config.sp.msal.init, config.sp.msal.scopes);
            break;
        case "off":
        default:
            clientFactory = () => new MsalFetchClient(config.sp.msal.init, config.sp.msal.scopes);
            break;
    }

    sp.setup({
        sp: {
            baseUrl: config.sp.url,
            fetchClientFactory: clientFactory,
            headers: { Accept: "application/json;odata=nometadata" }
        },
    });
}