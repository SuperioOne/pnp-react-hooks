import { useFolder, useFolders } from "../../../src";
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
/** @type{import("@pnp/sp/folders").IFolderInfo} **/
let testFolder;

afterEach(cleanup);

beforeAll(async () => {
  spTest = InitPnpTest();
  testFolder = await spTest.web.rootFolder.folders.getByUrl("SiteAssets")();
});

test("useFolder, get folder by unique Id", async () => {
  const hook = renderHook(() => useFolder(testFolder.UniqueId, { sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`Folder info:${testFolder.UniqueId}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFolder, get folder by relative url", async () => {
  const hook = renderHook(() =>
    useFolder(testFolder.ServerRelativeUrl, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `Folder info:${testFolder.ServerRelativeUrl}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFolders, get from default root folder", async () => {
  const hook = renderHook(() => useFolders({ sp: spTest }));

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Root folders", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFolders, get from root folder with unique Id", async () => {
  const hook = renderHook(() =>
    useFolders({ sp: spTest, rootFolderId: testFolder.UniqueId }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(
      `Folders from another root:${testFolder.UniqueId}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFolders, get from root folder with relative url", async () => {
  const hook = renderHook(() =>
    useFolders({ sp: spTest, rootFolderId: testFolder.ServerRelativeUrl }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(
      `Folders from another root:${testFolder.ServerRelativeUrl}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFolders incorrect folder Id", async () => {
  const errState = new ErrorState();
  renderHook(() =>
    useFolders({
      sp: spTest,
      error: errState.setError,
      rootFolderId: /** @type{any} **/ ({}),
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  }, DEFAULT_WAITFOR_OPTS);
});
