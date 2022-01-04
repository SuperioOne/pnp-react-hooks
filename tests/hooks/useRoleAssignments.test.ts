import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useRoleAssignments } from "../../src";

const reactDOMElement = initJSDOM();
let testList: IListInfo;
let testListItem: { ID: number; };

beforeAll(async () =>
{
    InitPnpTest();

    const testLists = await sp.web.lists.filter("ItemCount gt 0").top(1).get();

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testListItem = (await sp.web.lists.getById(testList.Id).items.top(1).get())[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useRoleAssignments get roles on web", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleAssignments()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on web", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleAssignments get roles on list", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleAssignments({
            scope: {
                list: testList.Id
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on list", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleAssignments get roles on item", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleAssignments({
            scope: {
                list: testList.Id,
                item: testListItem.ID
            },
            query:{
                top:5,
                select:["*"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on item", CustomHookMockup, props))
            .resolves.toBeTruthy());
});
