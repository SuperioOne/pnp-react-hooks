import { afterEach, beforeAll, expect, test } from "vitest";
import { useView, useViews } from "../../../src";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import {
  DEFAULT_WAITFOR_OPTS,
  ErrorState,
  InitPnpTest,
  logResponse,
} from "../../common";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let listInfo;
/** @type{import("@pnp/sp/views").IViewInfo} **/
let defaultViewInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const listInfos = await spTest.web.lists.top(1)();

  if (listInfos?.length < 1) throw new Error("Unable to find list");

  listInfo = listInfos[0];
  defaultViewInfo = await spTest.web.lists.getById(listInfo.Id).defaultView();
});

afterEach(cleanup);

test("useViews, get all views", async () => {
  const hook = renderHook(() =>
    useViews(listInfo.Id, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("List views", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useView, get view by Id", async () => {
  const hook = renderHook(() =>
    useView(listInfo.Id, defaultViewInfo.Id, {
      sp: spTest,
      query: {
        select: ["*"],
        expand: ["viewfields"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(hook.result.current?.Id).toBe(defaultViewInfo.Id);

    logResponse(`Views info by Id:${defaultViewInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useView, get view by title", async () => {
  const hook = renderHook(() =>
    useView(listInfo.Id, defaultViewInfo.Title, {
      sp: spTest,
      query: {
        select: ["*"],
        expand: ["viewfields"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(hook.result.current?.Title).toBe(defaultViewInfo.Title);

    logResponse(
      `Views info by Title:${defaultViewInfo.Title}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useView, get default view", async () => {
  const hook = renderHook(() =>
    useView(listInfo.Id, undefined, {
      sp: spTest,
      query: {
        select: ["*"],
        expand: ["viewfields"],
      },
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(hook.result.current?.Title).toBe(defaultViewInfo.Title);

    logResponse(`Default View:${defaultViewInfo.Title}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useView, view id with invalid type", async () => {
  const errState = new ErrorState();
  renderHook(() =>
    useView(listInfo.Id, /** @type{any} **/ ({}), {
      sp: spTest,
      query: {
        select: ["*"],
        expand: ["viewfields"],
      },
      error: errState.setError,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  });
});
