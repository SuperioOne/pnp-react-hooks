import { InitPnpTest } from "../../tools/InitPnpTest";
import { InternalQueryMockup, Options } from "../../tools/mockups/InternalQueryMockup";
import { SPFI } from "@pnp/sp";
import { SharepointQueryable } from "../../../src/types/SharepointQueryable";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});

afterEach(() => reactDOMElement.unmountComponent());

test("UseQuery error handling", async () =>
{
    const props: Options = {
        sp: spTest,
        customInvoke: () => async function (this: SharepointQueryable)
        {
            throw new Error("Synthetic error");
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("UseQuery error handling", InternalQueryMockup, props))
            .rejects.toThrow("Synthetic error"));
});