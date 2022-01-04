import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useLists } from "../../src";
import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useLists get web list infos", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useLists({
            query: {
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get web list infos", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useLists get top 1 list info", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useLists({
            query: {
                top: 1,
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get top 1 list info", CustomHookMockup, props))
            .resolves.toBeTruthy());
});