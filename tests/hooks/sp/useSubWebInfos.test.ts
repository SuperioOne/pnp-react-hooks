import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { useSubWebInfos } from "../../../src";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());

afterEach(() => reactDOMElement.unmountComponent());

test("useSubWebInfos all sub sites", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useSubWebInfos()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSubWebInfos all sub sites", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useSubWebInfos select top 1 subsite with Id and Title", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useSubWebInfos({
            query: {
                top: 1,
                select: ["Id", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSubWebInfos select top 1 subsite with Id and Title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});