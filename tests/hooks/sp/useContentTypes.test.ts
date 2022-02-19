import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { spfi as sp } from "@pnp/sp";
import { useContentTypes } from "../../../src";

const reactDOMElement = initJSDOM();
let listInfo: IListInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const listInfos = await sp().web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useContentTypes get web content types", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useContentTypes({
            query: {
                top: 2
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useContentTypes get web content types", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useContentTypes get list content types", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useContentTypes({
            query: {
                top: 2
            },
            list: listInfo.Id
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useContentTypes get list content types", CustomHookMockup, props))
            .resolves.toBeTruthy());
});