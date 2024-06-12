import { useChanges } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let listInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const listInfos = await spTest.web.lists.top(1)();

  if (listInfos?.length < 1) throw new Error("Unable to find list");

  listInfo = listInfos[0];
});

afterEach(cleanup);

test("useChanges, get web changes", async () => {
  const hook = renderHook(() =>
    useChanges(
      {
        Item: true,
        File: true,
        List: true,
        Update: true,
        Web: true,
        SystemUpdate: true,
        DeleteObject: true,
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Web changes", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useChanges, get list changes by list Id", async () => {
  const hook = renderHook(() =>
    useChanges(
      {
        Item: true,
        File: true,
        List: true,
        Update: true,
        Web: true,
        SystemUpdate: true,
        DeleteObject: true,
      },
      { sp: spTest, list: listInfo.Id },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`List changes:${listInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useChanges, get list changes by list title", async () => {
  const hook = renderHook(() =>
    useChanges(
      {
        Item: true,
        File: true,
        List: true,
        Update: true,
        Web: true,
        SystemUpdate: true,
        DeleteObject: true,
      },
      { sp: spTest, list: listInfo.Title },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`List changes:${listInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

