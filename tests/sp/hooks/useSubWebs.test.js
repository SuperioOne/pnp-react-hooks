import { useSubWebs } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useSubWebs, all sub sites", async () => {
  const hook = renderHook(() => useSubWebs({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Subwebs", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useSubWebs, select top 1 subsite with only Id and Title properties", async () => {
  const hook = renderHook(() =>
    useSubWebs({
      sp: spTest,
      query: {
        top: 1,
        select: ["Id", "Title"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Subwebs", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

