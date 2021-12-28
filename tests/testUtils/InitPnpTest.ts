import config from "../../.config/msalSettings";
import { MsalFetchClient } from "@pnp/nodejs";
import { sp } from "@pnp/sp";

export function InitPnpTest()
{
    sp.setup({
        sp: {
            baseUrl: config.sp.url,
            fetchClientFactory: () =>
            {
                return new MsalFetchClient(config.sp.msal.init, config.sp.msal.scopes);
            },
        },
    });
}