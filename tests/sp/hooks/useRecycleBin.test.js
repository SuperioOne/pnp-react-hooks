import { useRecycleBinItems } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useRecycleBinItems, get recycle bin items (default scope)", async () => {
  const hook = renderHook(() => useRecycleBinItems({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Recyclebin items", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRecycleBinItems, get recycle bin items", async () => {
  const hook = renderHook(() =>
    useRecycleBinItems({ sp: spTest, scope: "web" }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web recyclebin items", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRecycleBinItems, get recycle bin items with query", async () => {
  const hook = renderHook(() =>
    useRecycleBinItems({
      sp: spTest,
      scope: "web",
      query: {
        top: 2,
        select: ["Title", "ItemState"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Filtered web recyclebin items", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRecycleBinItems, get site recycle bin items", async () => {
  const hook = renderHook(() =>
    useRecycleBinItems({ sp: spTest, scope: "site" }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Site recyclebin items", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useRecycleBinItems get site recycle bin items with query", async () => {
  const hook = renderHook(() =>
    useRecycleBinItems({
      sp: spTest,
      scope: "site",
      query: {
        top: 2,
        select: ["Title", "ItemState"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Filtered site recyclebin items", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

