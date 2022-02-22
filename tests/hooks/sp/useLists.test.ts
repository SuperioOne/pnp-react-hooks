import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useList, useListChangeToken, useLists } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { SPFI } from "@pnp/sp";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testListInfo: IListInfo;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists.top(1)();

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