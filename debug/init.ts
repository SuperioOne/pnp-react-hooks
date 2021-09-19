import { JSDOM } from "jsdom";
import { sp } from "@pnp/sp";
import { MsalFetchClient } from "@pnp/nodejs";

const ROOT_DIV_ID = "react";

export async function InitEnvironment()
{
    await InitPnp();
    return InitJSDOM();
}

function InitJSDOM()
{
    const dom = new JSDOM(`<!DOCTYPE html><div id="${ROOT_DIV_ID}">Hello world</div>`);
    Reflect.defineProperty(global, "window", { value: dom });

    dom.window.CustomEvent

    return [dom.window.document.getElementById(ROOT_DIV_ID)];
}

async function InitPnp()
{
    const settingsFile = await import("../.conf/msalSettings");
    const config = settingsFile.default;

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