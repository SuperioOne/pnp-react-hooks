import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { PermissionKind } from "@pnp/sp/security";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useHasPermission } from "../../src";

const reactDOMElement = initJSDOM();
let testUserInfo: ISiteUserInfo;
let testList: IListInfo;
let testListItem: { ID: number; };
let userWebPermission: boolean = false;
let userWebMultiPermission: boolean = false;
let userListPermission: boolean = false;
let userItemPermission: boolean = false;

beforeAll(async () =>
{
    InitPnpTest();

    const testUsersPromise = sp.web.siteUsers.filter("Email ne ''").top(1).get();
    const testListPromise = sp.web.lists.filter("ItemCount gt 0").top(1).get();

    const [testLists, testUsers] = await Promise.all([testListPromise, testUsersPromise]);

    if (!testUsers)
        throw new Error("Unable to find user");

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testUserInfo = testUsers[0];
    testListItem = (await sp.web.lists.getById(testList.Id).items.top(1).get())[0];

    const [webPerm, listPerm, itemPerm, webPermMulti] = await Promise.all(
        [
            sp.web.userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            sp.web.lists.getById(testList.Id).userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            sp.web.lists.getById(testList.Id).items.getById(testListItem.ID).userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            sp.web.userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems | PermissionKind.ViewPages)
        ]);

    userWebPermission = webPerm;
    userWebMultiPermission = webPermMulti;
    userListPermission = listPerm;
    userItemPermission = itemPerm;
});
afterEach(() => reactDOMElement.unmountComponent());

test("useHasPermission current user has 'PermissionKind.ViewListItems' on web", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("seCurrentUserHasPermission current user has 'PermissionKind.ViewListItems' on web", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems and PermissionKind.ViewVersions' on web", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewVersions])
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("seCurrentUserHasPermission current user has 'PermissionKind.ViewListItems and PermissionKind.ViewVersions' on web", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems' on list", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useHasPermission current user has 'PermissionKind.ViewListItems' on list", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems' on list item", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id,
                item: testListItem.ID
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useHasPermission current user has 'PermissionKind.ViewListItems' on list item", CustomHookMockup, props))
            .resolves.toBe(true));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on web is ${userWebPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems, {
            userId: testUserInfo.Email
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on web is ${userWebPermission}`, CustomHookMockup, props))
            .resolves.toBe(userWebPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on list is ${userListPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems, {
            userId: testUserInfo.Id,
            scope: {
                list: testList.Id
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on list is ${userListPermission}`, CustomHookMockup, props))
            .resolves.toBe(userListPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on item is ${userItemPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id,
                item: testListItem.ID
            },
            userId: testUserInfo.LoginName
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on item is ${userItemPermission}`, CustomHookMockup, props))
            .resolves.toBe(userItemPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems and PermissionKind.ViewPages' on web is ${userWebMultiPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: () => useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewPages], {
            userId: testUserInfo.LoginName
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems and PermissionKind.ViewPages' on item is ${userWebMultiPermission}`, CustomHookMockup, props))
            .resolves.toBe(userWebMultiPermission));
});

test(`useHasPermission invalid user Id type`, async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(
            [PermissionKind.ViewListItems, PermissionKind.ViewPages],
            {
                exception: err,
                userId: {} as any
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission invalid user Id type`, CustomHookMockup, props))
            .rejects.toThrow("userId value type is not string or number."));
});