import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useSite } from "../../src";
import { ISiteInfo } from "../../src/types/ISiteInfo";
import { sp } from "@pnp/sp";

const reactDOMElement = initJSDOM();
let siteInfo: ISiteInfo;

beforeAll(async () =>
{
    InitPnpTest();

    siteInfo = await sp.site();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useSite get current site info", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSite({
            query: {
                select: ["Id", "Url", "CurrentChangeToken"]
            },
            exception: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSite get current site info", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useSite get site info by url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSite({
            query: {
                select: ["Id", "Url", "CurrentChangeToken"]
            },
            siteBaseUrl: siteInfo.Url,
            exception: err
        })
    };

    await act(async () =>
    {
        const info: ISiteInfo = await reactDOMElement.mountTestComponent("useSite get site info by url", CustomHookMockup, props);
        expect(info.Url.toLowerCase()).toBe(siteInfo.Url.toLowerCase());
    });
});

test("useSite invalid Url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSite({
            query: {
                select: ["Id", "Url", "CurrentChangeToken"]
            },
            siteBaseUrl: "httppp://ssss",
            exception: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSite invalid Url", CustomHookMockup, props))
            .rejects.toThrow("Site url is not valid."));
});