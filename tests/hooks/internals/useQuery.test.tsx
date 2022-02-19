import config from "../../../msalSettings";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { InternalQueryMockup, Options } from "../../tools/mockups/InternalQueryMockup";
import { SPFI } from "@pnp/sp";
import { SharepointQueryable } from "../../../src/types/SharepointQueryable";
import { _Web } from "@pnp/sp/webs/types";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});

afterEach(() => reactDOMElement.unmountComponent());

test("useQuery custom web via valid string", async () =>
{
    const props: Options = {
        sp: spTest,
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
        sp: spTest,
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

test("UseQuery error handling", async () =>
{
    const props: Options = {
        sp: spTest,
        customInvoke: () => async function (this: SharepointQueryable)
        {
            throw new Error("Synthetic error");
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("UseQuery error handling", InternalQueryMockup, props))
            .rejects.toThrow("Synthetic error"));
});