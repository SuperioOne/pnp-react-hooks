import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { ISiteGroupInfo } from "@pnp/sp/site-groups/types";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useGroup, useGroupUser, useGroupUsers, useIsMemberOf } from "../../src";

const reactDOMElement = initJSDOM();
let testGroupInfo: ISiteGroupInfo;
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const currentUserGroups = await sp.web.currentUser.groups.select("Id").get();

    const filter = currentUserGroups.map(e => `Id ne ${e.Id}`).join(" AND ");

    // get a group current user not in
    const groups = await sp.web.siteGroups.filter(filter).top(1).get();

    if (groups?.length < 1)
        throw new Error("Unable to find group");

    testGroupInfo = groups[0];

    const users = await sp.web.siteGroups.getById(testGroupInfo.Id).users.top(1).get();

    if (users?.length < 1)
        throw new Error("Unable to find group user");

    testUserInfo = users[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useGroup get by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useGroup(testGroupInfo.Id, {
            query: {
                select: ["Id", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroup get by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroup get by Name", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useGroup(testGroupInfo.Title, {
            query: {
                select: ["Id", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroup get by Name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroupUsers get group users", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useGroupUsers(testGroupInfo.Title, {
            query: {
                select: ["Id", "Title"],
                top: 3
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroupUser get group users", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useGroupUsers get group user by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useGroupUser(testGroupInfo.Title, testUserInfo.Id, {
            query: {
                select: ["Id", "Title"],
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useGroupUser get group user by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useIsMemberOf user is member of group", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useIsMemberOf(testGroupInfo.Title, {
            userId: testUserInfo.Id
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
        useHook: () => useIsMemberOf(testGroupInfo.Id, {
            userId: testUserInfo.Id
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
        useHook: () => useIsMemberOf(testGroupInfo.Title),
        completeWhen: (response: [boolean, ISiteGroupInfo]) => response[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useIsMemberOf user isn't member of group", CustomHookMockup, props);
        expect(data[0]).toBe(false);
    });
});