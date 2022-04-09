import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo, RenderListDataOptions } from "@pnp/sp/lists/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useList, useListAsStream, useListChangeToken, useLists } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testListInfo: IListInfo;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists
        .filter("ItemCount gt 0")
        .orderBy("ItemCount")
        .top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    testListInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useList get by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useList(testListInfo.Id, {
            query: {
                select: ["Title", "Id", "ItemCount"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useList get by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useList get by title", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useList(testListInfo.Title, {
            query: {
                select: ["Title", "Id", "ItemCount"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useList get by title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListChangeToken get change token by list Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListChangeToken(testListInfo.Id, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListChangeToken get change token by list Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListChangeToken get change token by list title", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListChangeToken(testListInfo.Title, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListChangeToken get change token by list title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});


test("useLists get web list infos", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useLists({
            query: {
                select: ["Title", "Id", "ItemCount"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get web list infos", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useLists get top 1 list info", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useLists({
            query: {
                top: 1,
                select: ["Title", "Id", "ItemCount"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useLists get top 1 list info", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListAsStream with override parameters on query string", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListAsStream(testListInfo.Id,
            {
                dataParameters: {
                    Paging: "TRUE",
                    RenderOptions: RenderListDataOptions.ListData
                },
                dataOverrideParameters: {
                    PageFirstRow: "1",
                    PageLastRow: "30"
                },
                useQueryParameters: true
            },
            {
                sp: spTest,
                error: err
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListAsStream with override parameters on query string", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListAsStream with override parameters", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListAsStream(testListInfo.Id,
            {
                dataParameters: {
                    Paging: "TRUE",
                    RenderOptions: RenderListDataOptions.ListData
                },
                dataOverrideParameters: {
                    PageFirstRow: "1",
                    PageLastRow: "30",
                },
            },
            {
                sp: spTest,
                error: err
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListAsStream with override parameters", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListAsStream without override", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListAsStream(testListInfo.Id,
            {
                dataParameters: {
                    Paging: "TRUE",
                    RenderOptions: RenderListDataOptions.ListData
                }
            },
            {
                sp: spTest,
                error: err
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListAsStream without override", CustomHookMockup, props))
            .resolves.toBeTruthy());
});