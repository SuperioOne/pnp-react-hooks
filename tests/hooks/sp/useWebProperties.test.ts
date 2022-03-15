import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useWebProperties } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useWebProperties without query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useWebProperties({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties without query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useWebProperties with query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useWebProperties({
            query: {
                select: ["ThemePrimary", "RectSiteLogoUrl"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});