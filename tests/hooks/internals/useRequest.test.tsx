import config from "../../../msalSettings";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { SharepointQueryable } from "../../../src/types/SharepointQueryable";
import { Web } from "@pnp/sp/webs";
import { _Web } from "@pnp/sp/webs/types";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { Options, InternalRequestMockup } from "../../testUtils/mockups/InternalRequestMockup";

const reactDOMElement = initJSDOM();
beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useRequest custom web via valid string", async () =>
{
    const props: Options = {
        web: config.sp.url,
        customInvoke: (cProps) => async function (this: _Web)
        {
            setTimeout(() => cProps.success(this.parentUrl === config.sp.url), 0);

            return "";
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRequest custom web via valid string", InternalRequestMockup, props))
            .resolves.toBe(true));
});

test("useRequest custom web via invalid string", async () =>
{
    const props: Options = {
        web: "non-url string",
        customInvoke: (cProps) => async function (this: _Web)
        {
            setTimeout(() => cProps.success(this.parentUrl === config.sp.url), 0);

            return "";
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRequest custom web via invalid string", InternalRequestMockup, props))
            .rejects.toThrow("Web parameter is not an absolute url."));
});

test("useRequest passing web object", async () =>
{
    const web = Web(config.sp.url);
    const props: Options = {
        web: web,
        customInvoke: (cProps) => async function (this: _Web)
        {
            setTimeout(() => cProps.success(this === web), 0);

            return "";
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRequest passing web object", InternalRequestMockup, props))
            .resolves.toBe(true));
});

test("useRequest error handling", async () =>
{
    const props: Options = {
        customInvoke: () => async function (this: SharepointQueryable)
        {
            throw new Error("Synthetic error");
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRequest error handling", InternalRequestMockup, props))
            .rejects.toThrow("Synthetic error"));
});