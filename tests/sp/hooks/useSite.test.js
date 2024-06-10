import { useSite } from "../../../src";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";
import { logResponse, InitPnpTest, DEFAULT_WAITFOR_OPTS } from "../../common";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useSite, get current site info", async () => {
  const hook = renderHook(() =>
    useSite({
      sp: spTest,
      query: {
        select: ["Id", "Url", "CurrentChangeToken"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Site info", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

