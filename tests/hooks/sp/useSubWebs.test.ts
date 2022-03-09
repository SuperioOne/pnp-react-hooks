import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useSubWebs } from "../../../src";
import { SPFI } from "@pnp/sp";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});

afterEach(() => reactDOMElement.unmountComponent());

test("useSubWebs all sub sites", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSubWebs({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSubWebInfos all sub sites", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useSubWebs select top 1 subsite with Id and Title", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSubWebs({
            query: {
                top: 1,
                select: ["Id", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSubWebInfos select top 1 subsite with Id and Title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});