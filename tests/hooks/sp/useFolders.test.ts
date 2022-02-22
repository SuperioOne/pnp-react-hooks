import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IFolderInfo } from "@pnp/sp/folders/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useFolder, useFolderTree, useFolders } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testFolder: IFolderInfo;
let rootFolderUrl: string;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const rInfo = await spTest.web.rootFolder();
    rootFolderUrl = rInfo.ServerRelativeUrl;

    testFolder = await spTest.web.rootFolder.folders.getByUrl("SiteAssets")();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFolder get folder by unique Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolder(testFolder.UniqueId, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolder get folder by unique Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolder get folder by relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolder(testFolder.ServerRelativeUrl, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolder get folder by relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from default root folder", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolders({
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from default root folder", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from root folder with unique Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolders({
            rootFolderId: testFolder.UniqueId,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with unique Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders get from root folder with relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolders({
            rootFolderId: testFolder.ServerRelativeUrl,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolders incorrect folder Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolders({
            rootFolderId: null as any,
            error: err,
            sp: spTest,
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolders get from root folder with relative url", CustomHookMockup, props))
            .rejects.toThrow("folderId is not a valid type"));
});

test("useFolderTree get directory tree of given root", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolderTree(rootFolderUrl, {
            fileQuery: {
                select: ["Name", "UniqueId", "ServerRelativeUrl", "Length"],
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFolderTree get directory tree of given root", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFolderTree get directory tree of given root and open sub directory", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFolderTree(rootFolderUrl, {
            fileQuery: {
                select: ["Name", "UniqueId", "ServerRelativeUrl", "Length"],
            },
            sp: spTest,
            error: err
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