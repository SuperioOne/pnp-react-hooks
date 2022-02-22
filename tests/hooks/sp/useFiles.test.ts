import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IFileInfo } from "@pnp/sp/files/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useFile, useFiles } from "../../../src";
import { IFolderInfo } from "@pnp/sp/folders/types";

const fName = "pnp-rct-testFile.txt";
const fContent = "Pnp React Hooks";
let testFileInfo: IFileInfo;
let testFolderInfo: IFolderInfo;
let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const [file, folder] = await Promise.all([
        spTest.web.rootFolder.folders.getByUrl("SiteAssets").files.addUsingPath(fName, fContent, { Overwrite: true }),
        spTest.web.rootFolder.folders.getByUrl("SiteAssets")()
    ]);

    testFileInfo = file.data;
    testFolderInfo = folder;
});
afterEach(() => reactDOMElement.unmountComponent());

test("useFile get file info by server relative url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFile(testFileInfo.ServerRelativeUrl, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFile get file info by server relative url", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFile get file content as text", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFile(testFileInfo.UniqueId, {
            type: "text",
            sp: spTest,
            error: err
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
        useHook: (err) => useFile("neither guid or relative url", {
            error: err,
            sp: spTest,
        })
    };

    await act(async () =>
        expect(reactDOMElement.mountTestComponent("useFile invalid file identifier", CustomHookMockup, props))
            .rejects.toThrow("fileId value is neither unique id or relative url."));
});
//

test("useFiles get root folder by relative Url", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFiles(testFolderInfo.ServerRelativeUrl, {
            query: {
                top: 5
            },
            sp: spTest,
            error: err
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
        useHook: (err) => useFiles(testFolderInfo.UniqueId, {
            query: {
                top: 5
            },
            sp: spTest,
            error: err
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
        useHook: (err) => useFiles("neither guid or relative url", {
            error: err,
            sp: spTest,
        })
    };

    await act(async () =>
        expect(reactDOMElement.mountTestComponent("useFiles invalid folder identifier", CustomHookMockup, props))
            .rejects.toThrow("folderId is not a valid type"));
});