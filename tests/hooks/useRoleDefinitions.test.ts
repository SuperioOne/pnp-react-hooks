import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useRoleDefinitions } from "../../src";
import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useRoleDefinitions get top 5 role definition", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleDefinitions({
            query: {
                top: 5
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinitions get top 5 role definition", CustomHookMockup, props))
            .resolves.toBeTruthy());
});