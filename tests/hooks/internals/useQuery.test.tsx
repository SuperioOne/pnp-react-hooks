import config from "../../../.config/msalSettings";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { InternalQueryMockup } from "../../testUtils/mockups/InternalQueryMockup";
import { Options } from "../../testUtils/mockups/InternalRequestMockup";
import { SharepointQueryable } from "../../../src/types/SharepointQueryable";
import { Web } from "@pnp/sp/webs";
import { _Web } from "@pnp/sp/webs/types";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";

const reactDOMElement = initJSDOM();
beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useQuery custom web via valid string", async () =>
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
        expect(reactDOMElement.mountTestComponent("useQuery custom web via valid string", InternalQueryMockup, props))
            .resolves.toBe(true));
});

test("useQuery custom web via invalid string", async () =>
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
        expect(reactDOMElement.mountTestComponent("useQuery custom web via invalid string", InternalQueryMockup, props))
            .rejects.toThrow("Web parameter is not an absolute url."));
});

test("useQuery passing web object", async () =>
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
        expect(reactDOMElement.mountTestComponent("useQuery passing web object", InternalQueryMockup, props))
            .resolves.toBe(true));
});

test("UseQuery error handling", async () =>
{
    const props: Options = {
        customInvoke: () => async function (this: SharepointQueryable)
        {
            throw new Error("Synthetic error");
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("UseQuery error handling", InternalQueryMockup, props))
            .rejects.toThrow("Synthetic error"));
});