import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { useCurrentUser } from "../../../src";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useCurrentUser without query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useCurrentUser()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser without query", CustomHookMockup, props))
            .resolves.not.toBeNull());
});

test("useCurrentUser with select query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useCurrentUser({
            query: {
                select: ["ID", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser with select query", CustomHookMockup, props))
            .resolves.not.toBeNull());
});