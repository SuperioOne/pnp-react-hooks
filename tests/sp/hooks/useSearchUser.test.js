import { useSearchUser } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/site-users").ISiteUserInfo} **/
let testUserInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const exmpUsers = await spTest.web.siteUsers
    .filter("Email ne '' and Email ne null")
    .top(1)();

  if (exmpUsers?.length < 1) throw new Error("Unable to find user");

  testUserInfo = exmpUsers[0];
});

afterEach(cleanup);

test("useSearchUser, search user by people picker query", async () => {
  const hook = renderHook(() =>
    useSearchUser(
      {
        AllowEmailAddresses: true,
        MaximumEntitySuggestions: 5,
        QueryString: testUserInfo.Email,
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("User search result by query", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useSearchUser search user by query text", async () => {
  const hook = renderHook(() =>
    useSearchUser(testUserInfo.Email, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(
      `User search results text:${testUserInfo.Email}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

