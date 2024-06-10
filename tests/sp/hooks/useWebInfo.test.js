import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { useWebInfo } from "../../../src";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useWebInfo without query", async () => {
  const hook = renderHook(() => useWebInfo({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web info", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useWebInfo with query", async () => {
  const hook = renderHook(() =>
    useWebInfo({
      sp: spTest,
      query: {
        select: ["ID", "Title"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web info", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

