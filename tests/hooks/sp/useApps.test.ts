import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useApp, useApps } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testApp;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const apps = await spTest.web.appcatalog.top(1)();

    if (apps?.length < 1)
        throw new Error("Unable to find test app");

    testApp = apps[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useApps get top 5 apps", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useApps({
            sp: spTest,
            error: err,
            query: {
                top: 5,
                select: ["Title", "ID"]
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApps get top 5 apps", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useApp get app by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useApp(testApp.ID, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApp get app by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

