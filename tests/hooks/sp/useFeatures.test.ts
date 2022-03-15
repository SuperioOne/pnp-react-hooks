import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useFeatures } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFeatures get site features", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFeatures({
            query: {
                top: 5,
                select: ["*"]
            },
            scope: "site",
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFeatures get site features", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFeatures get web features", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFeatures({
            query: {
                top: 5,
                select: ["*"]
            },
            scope: "web",
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFeatures get web features", CustomHookMockup, props))
            .resolves.toBeTruthy());
});