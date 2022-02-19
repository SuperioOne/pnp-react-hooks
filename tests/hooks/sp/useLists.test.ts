import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { useList, useListChangeToken, useLists } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { sp } from "@pnp/sp";

const reactDOMElement = initJSDOM();
let testListInfo: IListInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const listInfos = await sp.web.lists.top(1).get();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    testListInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useList get by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useList(testListInfo.Id, {
            query: {
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useList get by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useList get by title", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useList(testListInfo.Title, {
            query: {
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useList get by title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListChangeToken get change token by list Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useListChangeToken(testListInfo.Id)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListChangeToken get change token by list Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListChangeToken get change token by list title", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useListChangeToken(testListInfo.Title)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListChangeToken get change token by list title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});


test("useLists get web list infos", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useLists({
            query: {
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get web list infos", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useLists get top 1 list info", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useLists({
            query: {
                top: 1,
                select: ["Title", "Id", "ItemCount"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get top 1 list info", CustomHookMockup, props))
            .resolves.toBeTruthy());
});