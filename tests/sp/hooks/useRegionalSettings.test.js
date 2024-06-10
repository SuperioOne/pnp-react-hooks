import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";
import { useRegionalSetting } from "../../../src";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useRegionalSetting, get web region settings", async () => {
  const hook = renderHook(() => useRegionalSetting({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Regional settings", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});
