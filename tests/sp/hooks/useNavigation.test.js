import { useNavigation } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useNavigation, get web topNavigation nav nodes", async () => {
  const hook = renderHook(() => useNavigation({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("(Default) Top Navigation", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useNavigation, get single web topNavigation nav node", async () => {
  const hook = renderHook(() =>
    useNavigation({
      query: {
        top: 1,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Single navigation", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useNavigation, get web quickLaunch nav nodes", async () => {
  const hook = renderHook(() =>
    useNavigation({
      type: "quickLaunch",
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Quick launch navigation", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useNavigation, get top 1 web quickLaunch nav node", async () => {
  const hook = renderHook(() =>
    useNavigation({
      type: "quickLaunch",
      sp: spTest,
      query: { top: 1 },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Single quick launch navigation", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

