import {
  CustomHookMockup,
  CustomHookProps,
} from "../../tools/mockups/CustomHookMockup";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from "react-dom/test-utils";
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useFolder, useFolders } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testFolder: IFolderInfo;

beforeAll(async () => {
  InitGlobalFetch();
  reactDOMElement = initJSDOM();
  spTest = InitPnpTest();
  testFolder = await spTest.web.rootFolder.folders.getByUrl("SiteAssets")();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFolder get folder by unique Id", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolder(testFolder.UniqueId, {
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolder get folder by unique Id",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useFolder get folder by relative url", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolder(testFolder.ServerRelativeUrl, {
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolder get folder by relative url",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useFolders get from default root folder", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolders({
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolders get from default root folder",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useFolders get from root folder with unique Id", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolders({
        rootFolderId: testFolder.UniqueId,
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolders get from root folder with unique Id",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useFolders get from root folder with relative url", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolders({
        rootFolderId: testFolder.ServerRelativeUrl,
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolders get from root folder with relative url",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useFolders incorrect folder Id", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useFolders({
        rootFolderId: null as any,
        error: err,
        sp: spTest,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useFolders get from root folder with relative url",
        CustomHookMockup,
        props,
      ),
    ).rejects.toThrow("folderId is not a valid type"),
  );
});

