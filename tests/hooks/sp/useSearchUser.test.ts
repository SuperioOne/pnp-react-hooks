import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useSearchUser } from "../../../src";
import { IClientPeoplePickerQueryParameters } from "@pnp/sp/profiles/types";
import { SPFI } from "@pnp/sp";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const exmpUsers = await spTest.web.siteUsers.filter("Email ne '' and Email ne null").top(1)();

    if (exmpUsers?.length < 1)
        throw new Error("Unable to find user");

    testUserInfo = exmpUsers[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useSearchUser search user by people picker query", async () =>
{
    const searchQuery: IClientPeoplePickerQueryParameters = {
        AllowEmailAddresses: true,
        MaximumEntitySuggestions: 5,
        QueryString: testUserInfo.Email
    };

    const props: CustomHookProps = {
        useHook: (err) => useSearchUser(searchQuery, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSearchUser search user by people picker query", CustomHookMockup, props))
            .resolves.toBeTruthy());

});

test("useSearchUser search user by query text", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSearchUser(testUserInfo.Email, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSearchUser search user by query text", CustomHookMockup, props))
            .resolves.toBeTruthy());
});