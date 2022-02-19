import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../../tools/ReactDOMElement";
import { spfi as sp } from "@pnp/sp";
import { useFolder, useFolderTree, useFolders } from "../../../src";

const reactDOMElement = initJSDOM();
let testFolder: IFolderInfo;
let rootFolderUrl: string;

beforeAll(async () =>
{
    InitPnpTest();

    const rInfo = await sp().web.rootFolder();
    rootFolderUrl = rInfo.ServerRelativeUrl;

    testFolder = await sp().web.rootFolder.folders.getByUrl("SiteAssets")();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFolder get folder by unique Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolder(testFolder.UniqueId)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolder get folder by unique Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolder get folder by relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolder(testFolder.ServerRelativeUrl)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolder get folder by relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from default root folder", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolders()
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from default root folder", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from root folder with unique Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolders({ folderId: testFolder.UniqueId })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with unique Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from root folder with relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolders({ folderId: testFolder.ServerRelativeUrl })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders incorrect folder Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolders({
            folderId: null as any,
            exception: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with relative url", CustomHookMockup, props))
            .rejects.toThrow("folderId is not a valid type"));
});

test("useFolderTree get directory tree of given root", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolderTree(rootFolderUrl, {
            fileQuery: {
                select: ["Name", "UniqueId", "ServerRelativeUrl", "Length"],
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolderTree get directory tree of given root", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolderTree get directory tree of given root and open sub directory", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFolderTree(rootFolderUrl, {
            fileQuery: {
                select: ["Name", "UniqueId", "ServerRelativeUrl", "Length"],
            }
        }),
        completeWhen: (tree) =>
        {
            if (tree?.root.ServerRelativeUrl.toLowerCase().endsWith("siteassets"))
            {
                return true;
            }
            else if (tree?.folders.length > 0)
            {
                const subDirFolder = tree.folders.find(e => e.ServerRelativeUrl?.toLowerCase().endsWith("siteassets"));

                if (subDirFolder)
                    subDirFolder.setAsRoot();
            }

            return false;
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolderTree get directory tree of given root and open sub directory", CustomHookMockup, props))
            .resolves.toBeTruthy());
});