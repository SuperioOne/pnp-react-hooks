import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useCurrentUser } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useCurrentUser without query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useCurrentUser({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser without query", CustomHookMockup, props))
            .resolves.not.toBeNull());
});

test("useCurrentUser with select query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useCurrentUser({
            query: {
                select: ["ID", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser with select query", CustomHookMockup, props))
            .resolves.not.toBeNull());
});