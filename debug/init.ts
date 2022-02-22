import { spfi } from "@pnp/sp";
import { JSDOM } from "jsdom";
import msalSettings from "../msalSettings";
import { MsalDebugDefault } from "./behaviors/MsalDebugDefault";

const ROOT_DIV_ID = "react";

export async function InitEnvironment()
{
    const jsDomRoot = InitJSDOM();
    const spDebug = InitPnp();

    return { root: jsDomRoot, sp: spDebug };
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
    return spfi().using(MsalDebugDefault({
        msal: {
            config: msalSettings.sp.msal.init,
            scopes: msalSettings.sp.msal.scopes
        },
        baseUrl: msalSettings.sp.url
    }));
}