import "@pnp/sp/site-users";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useProfile, useUser } from "../../../src";
import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const exmpUsers = await spTest.web.siteUsers.filter("Email ne ''").top(1)();

    if (exmpUsers?.length < 1)
        throw new Error("Unable to find user");

    testUserInfo = exmpUsers[0];
});

afterEach(() => reactDOMElement.unmountComponent());

test("useUser by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useUser(testUserInfo.Id, {
            query: {
                select: ["ID", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useUser by login name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useUser(testUserInfo.LoginName, {
            query: {
                select: ["LoginName", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by login name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useUser by email", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useUser(testUserInfo.Email, {
            query: {
                select: ["Email", "Title"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useUser by login email", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useProfile by login name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useProfile(testUserInfo.LoginName, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useProfile by login name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});