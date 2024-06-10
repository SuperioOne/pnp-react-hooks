import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { useWebProperties } from "../../../src";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useWebProperties without query", async () => {
  const hook = renderHook(() => useWebProperties({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web properties", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useWebProperties with query", async () => {
  const hook = renderHook(() =>
    useWebProperties({
      sp: spTest,
      query: { select: ["ThemePrimary", "RectSiteLogoUrl"] },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web properties", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

