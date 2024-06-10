import { useRoleAssignments } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let testList;
/** @type{{ID:number}} **/
let testListItem;

beforeAll(async () => {
  spTest = InitPnpTest();

  const testLists = await spTest.web.lists.filter("ItemCount gt 0").top(1)();

  if (testLists?.length < 1)
    throw new Error("Unable to find list with minimum 1 item");

  testList = testLists[0];
  testListItem = (
    await spTest.web.lists.getById(testList.Id).items.top(1)()
  )[0];
});

afterEach(cleanup);

test("useRoleAssignments, get roles on web", async () => {
  const hook = renderHook(() => useRoleAssignments({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse("Role assignments on web", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRoleAssignments, get roles on list", async () => {
  const hook = renderHook(() =>
    useRoleAssignments({
      scope: {
        list: testList.Id,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse(`Role assignments on ${testList.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRoleAssignments, get roles on item", async () => {
  const hook = renderHook(() =>
    useRoleAssignments({
      scope: {
        list: testList.Id,
        item: testListItem.ID,
      },
      query: {
        top: 5,
        select: ["*"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    logResponse(
      `Role assignments on ${testList.Title}/${testListItem.ID}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});
