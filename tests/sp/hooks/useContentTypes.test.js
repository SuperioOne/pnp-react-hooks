import { afterEach, beforeAll, expect, test } from "vitest";
import { useContentTypes } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let listInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const listInfos = await spTest.web.lists.top(1)();

  if (listInfos?.length < 1) throw new Error("Unable to find list");

  listInfo = listInfos[0];
});

afterEach(cleanup);

test("useContentTypes, get web content types", async () => {
  const hook = renderHook(() =>
    useContentTypes({ sp: spTest, query: { top: 2 } }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Web content types", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useContentTypes, get list content types by list Id", async () => {
  const hook = renderHook(() =>
    useContentTypes({ sp: spTest, query: { top: 2 }, list: listInfo.Id }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(
      `List content types by list Id:${listInfo.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useContentTypes, get list content types by list title", async () => {
  const hook = renderHook(() =>
    useContentTypes({ sp: spTest, query: { top: 2 }, list: listInfo.Title }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse(
      `List content types by list title:${listInfo.Title}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

