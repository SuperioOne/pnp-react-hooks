import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useNavigation } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useNavigation get web topNavigation nav nodes", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useNavigation({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get web topNavigation nav nodes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get top 1 web topNavigation nav node", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useNavigation({
            query: {
                top: 1
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get top 1 web topNavigation nav node", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get web quickLaunch nav nodes", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useNavigation({
            type: "quickLaunch",
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get web quickLaunch nav nodes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get top 1 web quickLaunch nav node", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useNavigation({
            type: "quickLaunch",
            query: {
                top: 1
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get top 1 web quickLaunch nav node", CustomHookMockup, props))
            .resolves.toBeTruthy());
});