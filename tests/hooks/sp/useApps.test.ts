import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { spfi as sp } from "@pnp/sp";
import { useApp, useApps } from "../../../src";

const reactDOMElement = initJSDOM();
let testApp;

beforeAll(async () =>
{
    InitPnpTest();

    const apps = await sp().web.appcatalog.top(1)();

    if (apps?.length < 1)
        throw new Error("Unable to find test app");

    testApp = apps[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useApps get top 5 apps", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useApps({
            query: {
                top: 5,
                select: ["Title", "ID"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApps get top 5 apps", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useApp get app by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useApp(testApp.ID)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApp get app by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

