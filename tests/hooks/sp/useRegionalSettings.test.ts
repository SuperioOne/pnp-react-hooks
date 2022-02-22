import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useRegionalSetting } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useRegionalSetting get web region settings", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRegionalSetting({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRegionalSetting get web region settings", CustomHookMockup, props))
            .resolves.toBeTruthy());
});