import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { useWebProperties } from "../../../src";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

test("useWebProperties without query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useWebProperties()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties without query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useWebProperties with query", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useWebProperties({
            query: {
                select: ["ThemePrimary", "RectSiteLogoUrl"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});