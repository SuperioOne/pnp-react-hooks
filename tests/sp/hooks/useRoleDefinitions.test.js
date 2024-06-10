import { useRoleDefinition, useRoleDefinitions } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

/** @type{import("@pnp/sp/security").IRoleDefinitionInfo} **/
let testRoleDefinition;

beforeAll(async () => {
  spTest = InitPnpTest();

  const exmpRoleDefs = await spTest.web.roleDefinitions.top(1)();

  if (exmpRoleDefs?.length < 1)
    throw new Error("Unable to find role definition");

  testRoleDefinition = exmpRoleDefs[0];
});

test("useRoleDefinition, get role definition by numeric Id", async () => {
  const hook = renderHook(() =>
    useRoleDefinition(testRoleDefinition.Id, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse(
      `Role definition:${testRoleDefinition.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRoleDefinition get role definition by name", async () => {
  const hook = renderHook(() =>
    useRoleDefinition(testRoleDefinition.Name, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse(
      `Role definition:${testRoleDefinition.Name}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRoleDefinition, get role definition by role type", async () => {
  const hook = renderHook(() =>
    useRoleDefinition(
      { roleType: testRoleDefinition.RoleTypeKind },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse(
      `Role definition:${JSON.stringify({ roleType: testRoleDefinition.RoleTypeKind })}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRoleDefinitions get top 5 role definition", async () => {
  const hook = renderHook(() =>
    useRoleDefinitions({
      query: {
        top: 5,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse("Role definitions", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

