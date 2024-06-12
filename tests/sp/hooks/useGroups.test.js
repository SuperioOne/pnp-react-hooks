import {
  useGroup,
  useGroups,
  useGroupUser,
  useGroupUsers,
  useIsMemberOf,
} from "../../../src";
import {
  DEFAULT_WAITFOR_OPTS,
  ErrorState,
  InitPnpTest,
  logResponse,
} from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/site-groups").ISiteGroupInfo} **/
let testGroupInfo;
/** @type{import("@pnp/sp/site-users").ISiteUserInfo} **/
let testUserInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const currentUserGroups = await spTest.web.currentUser.groups.select("Id")();
  const filter = currentUserGroups.map((e) => `Id ne ${e.Id}`).join(" AND ");
  // get a group current user not in
  const groups = await spTest.web.siteGroups.filter(filter).top(1)();

  if (groups?.length < 1) throw new Error("Unable to find group");

  testGroupInfo = groups[0];

  const users = await spTest.web.siteGroups
    .getById(testGroupInfo.Id)
    .users.top(1)();

  if (users?.length < 1) throw new Error("Unable to find group user");

  testUserInfo = users[0];
});

afterEach(cleanup);

test("useGroup, get by Id", async () => {
  const hook = renderHook(() =>
    useGroup(testGroupInfo.Id, {
      query: {
        select: ["Id", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`Sp group:${testGroupInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroup, get by Title", async () => {
  const hook = renderHook(() =>
    useGroup(testGroupInfo.Title, {
      query: {
        select: ["Id", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`Sp group:${testGroupInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroupUsers, get group users", async () => {
  const hook = renderHook(() =>
    useGroupUsers(testGroupInfo.Title, {
      query: {
        select: ["Id", "Title"],
        top: 3,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`Sp group users:${testGroupInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroupUser, get group user by Id", async () => {
  const hook = renderHook(() =>
    useGroupUser(testGroupInfo.Title, testUserInfo.Id, {
      query: {
        select: ["Id", "Title"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `Sp group user:${testGroupInfo.Title}/${testUserInfo.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useIsMemberOf, user is member of group", async () => {
  const hook = renderHook(() =>
    useIsMemberOf(testGroupInfo.Title, {
      userId: testUserInfo.Id,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    const [isMember, info] = hook.result.current;

    expect(isMember).toBe(true);
    expect(info).toBeTruthy();
    expect(info).toBeTypeOf("object");
    expect(Array.isArray(info)).toBe(false);

    logResponse(
      `Is member of: ${testUserInfo.Title} -> ${testGroupInfo.Title}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useIsMemberOf, current user isn't member of group", async () => {
  const hook = renderHook(() =>
    useIsMemberOf(testGroupInfo.Title, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    const [isMember, info] = hook.result.current;

    expect(isMember).toBe(false);
    expect(info).toBeFalsy();

    logResponse(
      `Is member of: current user -> ${testGroupInfo.Title}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useIsMemberOf, invalid group Id type", async () => {
  const errState = new ErrorState();

  renderHook(() =>
    useIsMemberOf(/** @type{any} **/ ({}), {
      sp: spTest,
      error: errState.setError,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroups, get top 5 group", async () => {
  const hook = renderHook(() =>
    useGroups({
      sp: spTest,
      query: {
        top: 5,
        select: ["ID", "Title", "PrincipalType"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Site groups", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroups, for testUser by user Id", async () => {
  const hook = renderHook(() =>
    useGroups({
      query: {
        top: 5,
        select: ["ID", "Title", "PrincipalType"],
      },
      userId: testUserInfo.Id,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`Users groups:${testUserInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroups, for testUser by user login name", async () => {
  const hook = renderHook(() =>
    useGroups({
      query: {
        top: 5,
        select: ["ID", "Title", "PrincipalType"],
      },
      userId: testUserInfo.LoginName,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`Users groups:${testUserInfo.LoginName}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useGroups, for testUser by user invalid type", async () => {
  const errState = new ErrorState();

  renderHook(() =>
    useGroups({
      userId: /** @type{any} **/ ({}),
      error: errState.setError,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  }, DEFAULT_WAITFOR_OPTS);
});

