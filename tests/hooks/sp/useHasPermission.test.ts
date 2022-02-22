import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { PermissionKind } from "@pnp/sp/security";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useHasPermission } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testUserInfo: ISiteUserInfo;
let testList: IListInfo;
let testListItem: { ID: number; };
let userWebPermission: boolean = false;
let userWebMultiPermission: boolean = false;
let userListPermission: boolean = false;
let userItemPermission: boolean = false;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const testUsersPromise = spTest.web.siteUsers.filter("Email ne ''").top(1)();
    const testListPromise = spTest.web.lists.filter("ItemCount gt 0").top(1)();

    const [testLists, testUsers] = await Promise.all([testListPromise, testUsersPromise]);

    if (!testUsers)
        throw new Error("Unable to find user");

    if (testLists?.length < 1)
        throw new Error("Unable to find list with minimum 1 item");

    testList = testLists[0];
    testUserInfo = testUsers[0];
    testListItem = (await spTest.web.lists.getById(testList.Id).items.top(1)())[0];

    const [webPerm, listPerm, itemPerm, webPermMulti] = await Promise.all(
        [
            spTest.web.userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            spTest.web.lists.getById(testList.Id).userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            spTest.web.lists.getById(testList.Id).items.getById(testListItem.ID).userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
            spTest.web.userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems | PermissionKind.ViewPages)
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
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("seCurrentUserHasPermission current user has 'PermissionKind.ViewListItems' on web", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems and PermissionKind.ViewVersions' on web", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewVersions], {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("seCurrentUserHasPermission current user has 'PermissionKind.ViewListItems and PermissionKind.ViewVersions' on web", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems' on list", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useHasPermission current user has 'PermissionKind.ViewListItems' on list", CustomHookMockup, props))
            .resolves.toBe(true));
});

test("useHasPermission current user has 'PermissionKind.ViewListItems' on list item", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id,
                item: testListItem.ID
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useHasPermission current user has 'PermissionKind.ViewListItems' on list item", CustomHookMockup, props))
            .resolves.toBe(true));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on web is ${userWebPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            userId: testUserInfo.Email,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on web is ${userWebPermission}`, CustomHookMockup, props))
            .resolves.toBe(userWebPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on list is ${userListPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            userId: testUserInfo.Id,
            scope: {
                list: testList.Id
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on list is ${userListPermission}`, CustomHookMockup, props))
            .resolves.toBe(userListPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems' on item is ${userItemPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission(PermissionKind.ViewListItems, {
            scope: {
                list: testList.Id,
                item: testListItem.ID
            },
            userId: testUserInfo.LoginName,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission user 'PermissionKind.ViewListItems' on item is ${userItemPermission}`, CustomHookMockup, props))
            .resolves.toBe(userItemPermission));
});

test(`useHasPermission user 'PermissionKind.ViewListItems and PermissionKind.ViewPages' on web is ${userWebMultiPermission}`, async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewPages], {
            userId: testUserInfo.LoginName,
            sp: spTest,
            error: err
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
                sp: spTest,
                error: err,
                userId: {} as any
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent(`useHasPermission invalid user Id type`, CustomHookMockup, props))
            .rejects.toThrow("userId value type is not string or number."));
});