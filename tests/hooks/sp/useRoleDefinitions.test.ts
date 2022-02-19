import { CustomHookMockup, CustomHookProps } from "../../testUtils/mockups/CustomHookMockup";
import { IRoleDefinitionInfo } from "@pnp/sp/security/types";
import { InitPnpTest } from "../../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useRoleDefinition, useRoleDefinitions } from "../../../src";

const reactDOMElement = initJSDOM();
let testRoleDefinition: IRoleDefinitionInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const exmpRoleDefs = await sp.web.roleDefinitions.top(1).get();

    if (exmpRoleDefs?.length < 1)
        throw new Error("Unable to find role definition");

    testRoleDefinition = exmpRoleDefs[0];

});
afterEach(() => reactDOMElement.unmountComponent());

test("useRoleDefinition get role definition by numeric Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleDefinition(testRoleDefinition.Id)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by numeric Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinition get role definition by name", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleDefinition(testRoleDefinition.Name)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinition get role definition by role type", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleDefinition({ roleType: testRoleDefinition.RoleTypeKind })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by role type", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinitions get top 5 role definition", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useRoleDefinitions({
            query: {
                top: 5
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinitions get top 5 role definition", CustomHookMockup, props))
            .resolves.toBeTruthy());
});