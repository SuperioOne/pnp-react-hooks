import msalConfig from "../../msalSettings";
import testConfig from "../../test.config";
import { SPFI, spfi } from "@pnp/sp";
import { MsalTestDefault } from "./behaviors/MsalTestDefault";

export function InitPnpTest(): SPFI
{
    const sp = spfi().using(MsalTestDefault({
        baseUrl: msalConfig.sp.url,
        msal: {
            scopes: msalConfig.sp.msal.scopes,
            config: msalConfig.sp.msal.init
        },
        testEnv: testConfig
    }));

    return sp;
}