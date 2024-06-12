import "@pnp/sp/site-users";
import { useProfile, useUser } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/site-users").ISiteUserInfo} **/
let testUserInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const exmpUsers = await spTest.web.siteUsers.filter("Email ne ''").top(1)();

  if (exmpUsers?.length < 1) throw new Error("Unable to find user");

  testUserInfo = exmpUsers[0];
});

afterEach(cleanup);

test("useUser by Id", async () => {
  const hook = renderHook(() =>
    useUser(testUserInfo.Id, {
      query: {
        select: ["ID", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(`User info:${testUserInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useUser by login name", async () => {
  const hook = renderHook(() =>
    useUser(testUserInfo.LoginName, {
      query: {
        select: ["LoginName", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(`User info:${testUserInfo.LoginName}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useUser by email", async () => {
  const hook = renderHook(() =>
    useUser(testUserInfo.Email, {
      query: {
        select: ["Email", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(`User info:${testUserInfo.Email}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useProfile by login name", async () => {
  const hook = renderHook(() =>
    useProfile(testUserInfo.LoginName, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(`User profile:${testUserInfo.Email}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

