import { useSiteUsers } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(async () => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useSiteUsers top 5 users", async () => {
  const hook = renderHook(() =>
    useSiteUsers({
      query: {
        select: ["ID", "Title", "Email"],
        top: 5,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Site users", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

