import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IRoleDefinitionInfo } from "@pnp/sp/security/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useRoleDefinition, useRoleDefinitions } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testRoleDefinition: IRoleDefinitionInfo;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const exmpRoleDefs = await spTest.web.roleDefinitions.top(1)();

    if (exmpRoleDefs?.length < 1)
        throw new Error("Unable to find role definition");

    testRoleDefinition = exmpRoleDefs[0];

});
afterEach(() => reactDOMElement.unmountComponent());

test("useRoleDefinition get role definition by numeric Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleDefinition(testRoleDefinition.Id, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by numeric Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinition get role definition by name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleDefinition(testRoleDefinition.Name, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinition get role definition by role type", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleDefinition({ roleType: testRoleDefinition.RoleTypeKind }, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinition get role definition by role type", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRoleDefinitions get top 5 role definition", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRoleDefinitions({
            query: {
                top: 5
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRoleDefinitions get top 5 role definition", CustomHookMockup, props))
            .resolves.toBeTruthy());
});