import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { ListOptions } from "../../src/types/options";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { spfi as sp } from "@pnp/sp";
import { useListItem, useListItems } from "../../src";

const reactDOMElement = initJSDOM();
let testList: IListInfo;
let testListItem: { Id: number; };

beforeAll(async () =>
{
    InitPnpTest();

    const testLists = await sp().web.lists
        .filter("ItemCount gt 5 and ItemCount lt 5000")
        .select("Id")
        .top(1)();

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testListItem = (await sp().web.lists.getById(testList.Id).items.top(1)())[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useListItem get list item", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useListItem(testListItem.Id, testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useListItem get list item", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useListItem get list items", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useListItems(testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"]
            }
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
        useHook: () => useListItems(testList.Id, {
            query: {
                select: ["Id", "Title", "Author/Id"],
                expand: ["Author"],
            },
            mode: ListOptions.All
        })
    };

    await act(async () =>
    {
        const items = await reactDOMElement.mountTestComponent("useListItem get list items with getAll", CustomHookMockup, props);
        expect(items?.length).toBeGreaterThan(0);
    });
});
