import { JSDOM } from "jsdom";
import { sp } from "@pnp/sp";
import { MsalFetchClient } from "@pnp/nodejs";
import config from "../.config/msalSettings";

const ROOT_DIV_ID = "react";

export async function InitEnvironment()
{
    InitPnp();
    return InitJSDOM();
}

function InitJSDOM()
{
    const dom = new JSDOM(`<!DOCTYPE html><div id="${ROOT_DIV_ID}">Hello world</div>`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).window = dom.window;

    return dom.window.document.getElementById(ROOT_DIV_ID);
}

function InitPnp()
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