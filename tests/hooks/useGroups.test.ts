import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useGroups } from "../../src";
import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useGroups get top 5 group", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useGroups({
            query: {
                top: 5
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups get top 5 group", CustomHookMockup, props))
            .resolves.toBeTruthy());
});