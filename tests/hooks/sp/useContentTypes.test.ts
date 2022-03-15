import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useContentTypes } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let listInfo: IListInfo;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useContentTypes get web content types", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useContentTypes({
            query: {
                top: 2
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useContentTypes get web content types", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useContentTypes get list content types", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useContentTypes({
            query: {
                top: 2
            },
            list: listInfo.Id,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useContentTypes get list content types", CustomHookMockup, props))
            .resolves.toBeTruthy());
});