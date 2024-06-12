import { useApp, useApps } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
let testSiteCollectionApp;
let testTenantApp;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

beforeAll(async () => {
  spTest = InitPnpTest();

  const siteCollectionApp = await spTest.web.appcatalog.top(1)();
  const tenantApp = await spTest.tenantAppcatalog.top(1)();

  if (tenantApp?.length < 1) throw new Error("Unable to find test app");

  if (siteCollectionApp?.length < 1) throw new Error("Unable to find test app");

  testSiteCollectionApp = siteCollectionApp[0];
  testTenantApp = tenantApp[0];
});

test("useApps, get top 5 site collection apps", async () => {
  const hook = renderHook(() =>
    useApps({
      sp: spTest,
      query: {
        top: 5,
        select: ["Title", "ID"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Site collection apps", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useApp, get app by Id", async () => {
  const hook = renderHook(() =>
    useApp(testSiteCollectionApp.ID, {
      sp: spTest,
      query: {
        select: ["Title", "ID"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`App by id:${testSiteCollectionApp.ID}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useApps, get top 5 tenant apps", async () => {
  const hook = renderHook(() =>
    useApps({
      sp: spTest,
      query: {
        top: 5,
        select: ["Title", "ID"],
      },
      scope: "tenant",
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Site collection apps", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useApp, get tenant app by Id", async () => {
  const hook = renderHook(() =>
    useApp(testTenantApp.ID, {
      sp: spTest,
      scope: "tenant",
      query: {
        select: ["Title", "ID"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`App by id:${testTenantApp.ID}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});
