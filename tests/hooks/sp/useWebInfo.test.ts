import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useWebInfo } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useWebInfo without query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useWebInfo({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo without query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useWebInfo with query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useWebInfo({
            query: {
                select: ["ID", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});