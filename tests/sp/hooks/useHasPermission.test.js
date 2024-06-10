import { PermissionKind } from "@pnp/sp/security";
import { AssertError, useHasPermission } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest } from "../../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/**  @type{import("@pnp/sp/site-users").ISiteUserInfo} **/
let testUserInfo;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let testList;
/** @type{{ID:number}} **/
let testListItem;
let userWebPermission = false;
let userWebMultiPermission = false;
let userListPermission = false;
let userItemPermission = false;

beforeAll(async () => {
  spTest = InitPnpTest();

  const testUsersPromise = spTest.web.siteUsers.filter("Email ne ''").top(1)();
  const testListPromise = spTest.web.lists.filter("ItemCount gt 0").top(1)();

  const [testLists, testUsers] = await Promise.all([
    testListPromise,
    testUsersPromise,
  ]);

  if (!testUsers) throw new Error("Unable to find user");

  if (testLists?.length < 1)
    throw new Error("Unable to find list with minimum 1 item");

  testList = testLists[0];
  testUserInfo = testUsers[0];
  testListItem = (
    await spTest.web.lists.getById(testList.Id).items.top(1)()
  )[0];

  const [webPerm, listPerm, itemPerm, webPermMulti] = await Promise.all([
    spTest.web.userHasPermissions(
      testUserInfo.LoginName,
      PermissionKind.ViewListItems,
    ),
    spTest.web.lists
      .getById(testList.Id)
      .userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
    spTest.web.lists
      .getById(testList.Id)
      .items.getById(testListItem.ID)
      .userHasPermissions(testUserInfo.LoginName, PermissionKind.ViewListItems),
    spTest.web.userHasPermissions(
      testUserInfo.LoginName,
      PermissionKind.ViewListItems | PermissionKind.ViewPages,
    ),
  ]);

  userWebPermission = webPerm;
  userWebMultiPermission = webPermMulti;
  userListPermission = listPerm;
  userItemPermission = itemPerm;
});

afterEach(cleanup);

test("useHasPermission, current user has 'PermissionKind.ViewListItems' on web", async () => {
  const hook = renderHook(() =>
    useHasPermission(PermissionKind.ViewListItems, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(true);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useHasPermission, current user has 'PermissionKind.ViewListItems and PermissionKind.ViewVersions' on web", async () => {
  const hook = renderHook(() =>
    useHasPermission(
      [PermissionKind.ViewListItems, PermissionKind.ViewVersions],
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(true);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useHasPermission, current user has 'PermissionKind.ViewListItems' on list", async () => {
  const hook = renderHook(() =>
    useHasPermission(
      [PermissionKind.ViewListItems, PermissionKind.ViewVersions],
      { sp: spTest, scope: { list: testList.Id } },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(true);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useHasPermission, current user has 'PermissionKind.ViewListItems' on list item", async () => {
  const hook = renderHook(() =>
    useHasPermission(
      [PermissionKind.ViewListItems, PermissionKind.ViewVersions],
      { sp: spTest, scope: { list: testList.Id, item: testListItem.ID } },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(true);
  }, DEFAULT_WAITFOR_OPTS);
});

test(`useHasPermission, user 'PermissionKind.ViewListItems' on web is ${userWebPermission}`, async () => {
  const hook = renderHook(() =>
    useHasPermission(PermissionKind.ViewListItems, {
      sp: spTest,
      userId: testUserInfo.Email,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(userWebPermission);
  }, DEFAULT_WAITFOR_OPTS);
});

test(`useHasPermission, user 'PermissionKind.ViewListItems' on list is ${userListPermission}`, async () => {
  const hook = renderHook(() =>
    useHasPermission(PermissionKind.ViewListItems, {
      userId: testUserInfo.Id,
      scope: {
        list: testList.Id,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(userListPermission);
  }, DEFAULT_WAITFOR_OPTS);
});

test(`useHasPermission, user 'PermissionKind.ViewListItems' on item is ${userItemPermission}`, async () => {
  const hook = renderHook(() =>
    useHasPermission(PermissionKind.ViewListItems, {
      scope: {
        list: testList.Id,
        item: testListItem.ID,
      },
      userId: testUserInfo.LoginName,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(userItemPermission);
  }, DEFAULT_WAITFOR_OPTS);
});

test(`useHasPermission, user 'PermissionKind.ViewListItems and PermissionKind.ViewPages' on web is ${userWebMultiPermission}`, async () => {
  const hook = renderHook(() =>
    useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewPages], {
      userId: testUserInfo.LoginName,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBe(userWebMultiPermission);
  }, DEFAULT_WAITFOR_OPTS);
});

test(`useHasPermission, invalid user Id type`, async () => {
  let errState = (() => {
    let state = null;

    return {
      get error() {
        return state;
      },
      set error(/** @type{any} **/ value) {
        state = value;
      },
    };
  })();

  const errorHandler = (/** @type{any} **/ err) => {
    errState.error = err;
  };

  const hook = renderHook(() =>
    useHasPermission([PermissionKind.ViewListItems, PermissionKind.ViewPages], {
      sp: spTest,
      userId: /** @type{any} **/ ({}),
      error: errorHandler,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
    expect(hook.result.current).not.toBeTruthy();
  }, DEFAULT_WAITFOR_OPTS);
});

