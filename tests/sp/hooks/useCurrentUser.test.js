import { afterEach, beforeAll, expect, test } from "vitest";
import { useCurrentUser } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useCurrentUser without query", async () => {
  const hook = renderHook(() => useCurrentUser({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Current user", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useCurrentUser with select query", async () => {
  const hook = renderHook(() =>
    useCurrentUser({ sp: spTest, query: { select: ["ID", "Title"] } }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Current user", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

