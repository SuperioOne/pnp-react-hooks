import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { useSearchUser } from "../../src";
import { IClientPeoplePickerQueryParameters } from "@pnp/sp/profiles/types";
import { PrincipalType, sp } from "@pnp/sp";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

const reactDOMElement = initJSDOM();
let testUserInfo: ISiteUserInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const exmpUsers = await sp.web.siteUsers.top(1).get();

    if (exmpUsers?.length < 1)
        throw new Error("Unable to find user");

    testUserInfo = exmpUsers[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useSearchUser search user by people picker query", async () =>
{
    const searchQuery: IClientPeoplePickerQueryParameters = {
        PrincipalType: PrincipalType.User,
        AllowEmailAddresses: true,
        MaximumEntitySuggestions: 5,
        QueryString: testUserInfo.Email
    };

    const props: CustomHookProps = {
        useHook: () => useSearchUser(searchQuery)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSearchUser search user by people picker query", CustomHookMockup, props))
            .resolves.toBeTruthy());

});

test("useSearchUser search user by query text", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useSearchUser(testUserInfo.Email)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useSearchUser search user by query text", CustomHookMockup, props))
            .resolves.toBeTruthy());
});