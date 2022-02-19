import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { useNavigation } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useNavigation get web topNavigation nav nodes", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useNavigation()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get web topNavigation nav nodes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get top 1 web topNavigation nav node", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useNavigation({
            query: {
                top: 1
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get top 1 web topNavigation nav node", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get web quickLaunch nav nodes", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useNavigation({
            type: "quickLaunch"
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get web quickLaunch nav nodes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useNavigation get top 1 web quickLaunch nav node", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useNavigation({
            type: "quickLaunch",
            query: {
                top: 1
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useNavigation get top 1 web quickLaunch nav node", CustomHookMockup, props))
            .resolves.toBeTruthy());
});