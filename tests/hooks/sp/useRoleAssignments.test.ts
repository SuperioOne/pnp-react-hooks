import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useRoleAssignments } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testList: IListInfo;
let testListItem: { ID: number; };

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const testLists = await spTest.web.lists.filter("ItemCount gt 0").top(1)();

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testListItem = (await spTest.web.lists.getById(testList.Id).items.top(1)())[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useRoleAssignments get roles on web", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleAssignments({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on web", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleAssignments get roles on list", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleAssignments({
            scope: {
                list: testList.Id
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on list", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleAssignments get roles on item", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleAssignments({
            scope: {
                list: testList.Id,
                item: testListItem.ID
            },
            query: {
                top: 5,
                select: ["*"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleAssignments get roles on item", CustomHookMockup, props))
            .resolves.toBeTruthy());
});
