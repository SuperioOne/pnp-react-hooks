import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useProfile, useUser } from "../../src";
import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";

const reactDOMElement = initJSDOM();
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const exmpUsers = await sp.web.siteUsers.filter("Email ne ''").top(1).get();

    if (exmpUsers?.length < 1)
        throw new Error("Unable to find user");

    testUserInfo = exmpUsers[0];
});

afterEach(() => reactDOMElement.unmountComponent());

test("useUser by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useUser(testUserInfo.Id, {
            query: {
                select: ["ID", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useUser by login name", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useUser(testUserInfo.LoginName, {
            query: {
                select: ["LoginName", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by login name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useUser by email", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useUser(testUserInfo.Email, {
            query: {
                select: ["Email", "Title"]
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by login email", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useProfile by login name", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useProfile(testUserInfo.LoginName)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useProfile by login name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});