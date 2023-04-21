import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useApp, useApps } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testSiteCollectionApp;
let testTenantApp;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const siteCollectionApp = await spTest.web.appcatalog.top(1)();
    const tenantApp = await spTest.tenantAppcatalog.top(1)();

    if (siteCollectionApp?.length < 1)
        throw new Error("Unable to find test app");

    if (tenantApp?.length < 1)
        throw new Error("Unable to find test app");

    testSiteCollectionApp = siteCollectionApp[0];
    testTenantApp = tenantApp[0];
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
        useHook: (err) => useApp(testSiteCollectionApp.ID, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApp get app by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useApps get top 5 tenant apps", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useApps({
            sp: spTest,
            error: err,
            scope: "tenant",
            query: {
                top: 5,
                select: ["Title", "ID"]
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApps get top 5 tenant apps", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useApp get tenant app by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useApp(testTenantApp.ID, {
            sp: spTest,
            scope: "tenant",
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useApp get tenant app by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});
