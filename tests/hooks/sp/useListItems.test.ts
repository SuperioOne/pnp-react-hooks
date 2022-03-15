import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { ListOptions } from "../../../src/types/options";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useListItem, useListItems } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testList: IListInfo;
let testListItem: { Id: number; };

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const testLists = await spTest.web.lists
        .filter("ItemCount gt 5 and ItemCount lt 5000")
        .select("Id")
        .top(1)();

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testListItem = (await spTest.web.lists.getById(testList.Id).items.top(1)())[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useListItem get list item", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListItem(testListItem.Id, testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListItem get list item", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListItem get list items", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListItems(testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(async () =>
    {
        const items = await reactDOMElement.mountTestComponent("useListItem get list items", CustomHookMockup, props);
        expect(items?.length).toBeGreaterThan(0);
    });
});

test("useListItem get list items with getAll", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useListItems(testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"],
            },
            mode: ListOptions.All,
            sp: spTest,
            error: err
        })
    };

    await act(async () =>
    {
        const items = await reactDOMElement.mountTestComponent("useListItem get list items with getAll", CustomHookMockup, props);
        expect(items?.length).toBeGreaterThan(0);
    });
});
