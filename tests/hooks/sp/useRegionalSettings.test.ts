import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { useRegionalSetting } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";

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