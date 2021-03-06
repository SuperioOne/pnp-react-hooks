import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useGroup, useGroups, useGroupUser, useGroupUsers, useIsMemberOf } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testGroupInfo: ISiteGroupInfo;
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const currentUserGroups = await spTest.web.currentUser.groups.select("Id")();

    const filter = currentUserGroups.map(e => `Id ne ${e.Id}`).join(" AND ");

    // get a group current user not in
    const groups = await spTest.web.siteGroups.filter(filter).top(1)();

    if (groups?.length < 1)
        throw new Error("Unable to find group");

    testGroupInfo = groups[0];

    const users = await spTest.web.siteGroups.getById(testGroupInfo.Id).users.top(1)();

    if (users?.length < 1)
        throw new Error("Unable to find group user");

    testUserInfo = users[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useGroup get by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroup(testGroupInfo.Id, {
            query: {
                select: ["Id", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroup get by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroup get by Name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroup(testGroupInfo.Title, {
            query: {
                select: ["Id", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroup get by Name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroupUsers get group users", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroupUsers(testGroupInfo.Title, {
            query: {
                select: ["Id", "Title"],
                top: 3
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroupUser get group users", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroupUsers get group user by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroupUser(testGroupInfo.Title, testUserInfo.Id, {
            query: {
                select: ["Id", "Title"],
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroupUser get group user by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useIsMemberOf user is member of group", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useIsMemberOf(testGroupInfo.Title, {
            userId: testUserInfo.Id,
            sp: spTest,
            error: err
        }),
        completeWhen: (response: [boolean, ISiteGroupInfo]) => response[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useIsMemberOf user is member of group", CustomHookMockup, props);
        expect(data[0]).toBe(true);
    });
});

test("useIsMemberOf user is member of group", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useIsMemberOf(testGroupInfo.Id, {
            userId: testUserInfo.Id,
            sp: spTest,
            error: err
        }),
        completeWhen: (response: [boolean, ISiteGroupInfo]) => response[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useIsMemberOf user is member of group", CustomHookMockup, props);
        expect(data[0]).toBe(true);
    });
});

test("useIsMemberOf current user isn't member of group", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useIsMemberOf(testGroupInfo.Title, {
            sp: spTest,
            error: err
        }),
        completeWhen: (response: [boolean, ISiteGroupInfo]) => response[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useIsMemberOf user isn't member of group", CustomHookMockup, props);
        expect(data[0]).toBe(false);
    });
});

test("useIsMemberOf invalid group Id type", async () =>
{
    const value = <any>{ invalid: "invalid" };

    const props: CustomHookProps = {
        useHook: (err) => useIsMemberOf(value, {
            error: err,
            sp: spTest,
        }),
        completeWhen: (response: [boolean, ISiteGroupInfo]) => response[0] !== undefined
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useIsMemberOf invalid group Id type", CustomHookMockup, props))
            .rejects.toThrow("groupId type is not valid."));
});

test("useGroups get top 5 group", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroups({
            query: {
                top: 5
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups get top 5 group", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroups for testUser by user Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroups({
            query: {
                top: 5
            },
            userId: testUserInfo.Id,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups for testUser by user Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroups for testUser by user email", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroups({
            query: {
                top: 5
            },
            userId: testUserInfo.Email,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups for testUser by user email", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroups for testUser by user login name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroups({
            query: {
                top: 5
            },
            userId: testUserInfo.LoginName,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups for testUser by user login name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroups for testUser by user invalid value", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useGroups({
            userId: {} as any,
            error: err,
            sp: spTest,
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroups for testUser by user login name", CustomHookMockup, props))
            .rejects.toThrow("userId value type is not string or number."));
});