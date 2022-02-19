import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { useRegionalSetting } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useRegionalSetting get web region settings", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRegionalSetting()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRegionalSetting get web region settings", CustomHookMockup, props))
            .resolves.toBeTruthy());
});