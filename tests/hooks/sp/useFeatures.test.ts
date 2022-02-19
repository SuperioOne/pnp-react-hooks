import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { useFeatures } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useFeatures get site features", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFeatures({
            query: {
                top: 5,
                select: ["*"]
            },
            scope: "site"
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFeatures get site features", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFeatures get web features", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFeatures({
            query: {
                top: 5,
                select: ["*"]
            },
            scope: "web"
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFeatures get web features", CustomHookMockup, props))
            .resolves.toBeTruthy());
});