import { useFile, useFiles } from "../../../src";
import {
  DEFAULT_WAITFOR_OPTS,
  ErrorState,
  InitPnpTest,
  logResponse,
} from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

const fName = "pnp-rct-testFile.txt";
const fContent = "Pnp React Hooks";

/** @type{import("@pnp/sp/files").IFileInfo} **/
let testFileInfo;
/** @type{import("@pnp/sp/folders").IFolderInfo} **/
let testFolderInfo;
/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(async () => {
  spTest = InitPnpTest();

  const [file, folder] = await Promise.all([
    spTest.web.rootFolder.folders
      .getByUrl("SiteAssets")
      .files.addUsingPath(fName, fContent, { Overwrite: true }),
    spTest.web.rootFolder.folders.getByUrl("SiteAssets")(),
  ]);

  testFileInfo = file;
  testFolderInfo = folder;
});

afterEach(cleanup);

test("useRegionalSetting, get web region settings", async () => {});

test("useFile, get file info by server relative url", async () => {
  const hook = renderHook(() =>
    useFile(testFileInfo.ServerRelativeUrl, { sp: spTest }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();

    logResponse("Test file info", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFile get file content as text", async () => {
  const hook = renderHook(() =>
    useFile(testFileInfo.ServerRelativeUrl, { sp: spTest, type: "text" }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("string");
    expect(hook.result.current).toBe(fContent);

    logResponse("Test file as text", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFile, invalid file identifier", async () => {
  const errState = new ErrorState();
  const hook = renderHook(() =>
    useFile("Not a guid or server relative Url", {
      sp: spTest,
      error: errState.setError,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFiles, get root folder by relative Url", async () => {
  const hook = renderHook(() =>
    useFiles(testFolderInfo.ServerRelativeUrl, {
      query: {
        top: 5,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(
      `folder items:${testFolderInfo.ServerRelativeUrl}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFiles, get root folder by unique Id", async () => {
  const hook = renderHook(() =>
    useFiles(testFolderInfo.UniqueId, {
      query: {
        top: 5,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`folder items:${testFolderInfo.UniqueId}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFiles invalid folder identifier", async () => {
  const errState = new ErrorState();
  const hook = renderHook(() =>
    useFile("Not a guid or server relative Url", {
      sp: spTest,
      error: errState.setError,
    }),
  );

  await waitFor(() => {
    expect(errState.error).toBeInstanceOf(TypeError);
  }, DEFAULT_WAITFOR_OPTS);
});

