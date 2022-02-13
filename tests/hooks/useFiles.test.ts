import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IFileInfo } from "@pnp/sp/files/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useFile, useFiles } from "../../src";
import { IFolderInfo } from "@pnp/sp/folders/types";

const fName = "pnp-rct-testFile.txt";
const fContent = "Pnp React Hooks";
let testFileInfo: IFileInfo;
let testFolderInfo: IFolderInfo;
const reactDOMElement = initJSDOM();

beforeAll(async () =>
{
    InitPnpTest();

    const [file, folder] = await Promise.all([
        sp.web.rootFolder.folders.getByName("SiteAssets").files.add(fName, fContent),
        sp.web.rootFolder.folders.getByName("SiteAssets").get()
    ]);

    testFileInfo = file.data;
    testFolderInfo = folder;
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFile get file info by server relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFile(testFileInfo.ServerRelativeUrl)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFile get file info by server relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFile get file content as buffer", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFile(testFileInfo.UniqueId, {
            type: "buffer"
        })
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useFile get file content as buffer", CustomHookMockup, props);

        expect(data && data instanceof ArrayBuffer).toBe(true);
    });
});

test("useFile get file content as text", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFile(testFileInfo.UniqueId, {
            type: "text"
        })
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useFile get file content as text", CustomHookMockup, props);

        expect(data).toBe(fContent);
    });
});

test("useFile invalid file identifier", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFile("neither guid or relative url", { exception: err })
    };

    await act(async () =>
        expect(reactDOMElement.mountTestComponent("useFile invalid file identifier", CustomHookMockup, props))
            .rejects.toThrow("fileId value is neither unique id or relative url."));
});
//

test("useFiles get root folder by relative Url", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFiles(testFolderInfo.ServerRelativeUrl, {
            query: {
                top: 5
            }
        })
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useFiles get root folder by relative Url", CustomHookMockup, props);
        expect(data).toBeTruthy();
    });
});

test("useFiles get root folder by unique Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFiles(testFolderInfo.UniqueId, {
            query: {
                top: 5
            }
        })
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useFiles get root folder by unique Id", CustomHookMockup, props);
        expect(data).toBeTruthy();
    });
});


test("useFiles invalid folder identifier", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFiles("neither guid or relative url", { exception: err })
    };

    await act(async () =>
        expect(reactDOMElement.mountTestComponent("useFiles invalid folder identifier", CustomHookMockup, props))
            .rejects.toThrow("folderId is not a valid type"));
});