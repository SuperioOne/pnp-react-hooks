import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { useWebInfo } from "../../src/hooks/useWebInfo";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useWebInfo without query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useWebInfo()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo without query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useWebInfo with query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useWebInfo({
            query: {
                select: ["ID", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});