import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useSiteUsers } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useSiteUsers top 5 users", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSiteUsers({
            query: {
                select: ["ID", "Title", "Email"],
                top: 5
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSiteUsers top 5 users", CustomHookMockup, props))
            .resolves.toBeTruthy());
});