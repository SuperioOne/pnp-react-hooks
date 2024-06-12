import { RenderListDataOptions } from "@pnp/sp/lists";
import {
  useList,
  useListAsStream,
  useListChangeToken,
  useLists,
} from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let testListInfo;

afterEach(cleanup);

beforeAll(async () => {
  spTest = InitPnpTest();

  const listInfos = await spTest.web.lists
    .filter("ItemCount gt 0")
    .orderBy("ItemCount")
    .top(1)();

  if (listInfos?.length < 1) throw new Error("Unable to find list");

  testListInfo = listInfos[0];
});

test("useList, get by Id", async () => {
  const hook = renderHook(() =>
    useList(testListInfo.Id, {
      query: {
        select: ["Title", "Id", "ItemCount"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`List info:${testListInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useList, get by title", async () => {
  const hook = renderHook(() =>
    useList(testListInfo.Title, {
      query: {
        select: ["Title", "Id", "ItemCount"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`List info:${testListInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListChangeToken, get change token by list Id", async () => {
  const hook = renderHook(() =>
    useListChangeToken(testListInfo.Id, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`List change token:${testListInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListChangeToken get change token by list title", async () => {
  const hook = renderHook(() =>
    useListChangeToken(testListInfo.Title, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`List change token:${testListInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useLists, get web list infos", async () => {
  const hook = renderHook(() =>
    useLists({
      query: {
        select: ["Title", "Id", "ItemCount"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`Web lists:${testListInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListAsStream with override parameters on query string", async () => {
  const hook = renderHook(() =>
    useListAsStream(
      testListInfo.Id,
      {
        dataParameters: {
          Paging: "TRUE",
          RenderOptions: RenderListDataOptions.ListData,
        },
        dataOverrideParameters: {
          PageFirstRow: "1",
          PageLastRow: "30",
        },
        useQueryParameters: true,
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `List as stream result:${testListInfo.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListAsStream with override parameters", async () => {
  const hook = renderHook(() =>
    useListAsStream(
      testListInfo.Id,
      {
        dataParameters: {
          Paging: "TRUE",
          RenderOptions: RenderListDataOptions.ListData,
        },
        dataOverrideParameters: {
          PageFirstRow: "1",
          PageLastRow: "30",
        },
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `Override parameters, List as stream result:${testListInfo.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListAsStream without override", async () => {
  const hook = renderHook(() =>
    useListAsStream(
      testListInfo.Id,
      {
        dataParameters: {
          Paging: "TRUE",
          RenderOptions: RenderListDataOptions.ListData,
        },
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `Without override parameters, List as stream result:${testListInfo.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

