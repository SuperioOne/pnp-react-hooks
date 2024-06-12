import { useFeatures } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useFeatures, get site features", async () => {
  const hook = renderHook(() =>
    useFeatures({
      query: {
        top: 5,
        select: ["*"],
      },
      scope: "site",
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Site features", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFeatures, get web features", async () => {
  const hook = renderHook(() =>
    useFeatures({
      query: {
        top: 5,
        select: ["*"],
      },
      scope: "web",
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web features", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});
