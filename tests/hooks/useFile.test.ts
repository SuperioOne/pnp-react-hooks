import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IFileInfo } from "@pnp/sp/files/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useFile } from "../../src";

const fName = "pnp-rct-testFile.txt";
const fContent = "Pnp React Hooks";
let testFileInfo: IFileInfo;
const reactDOMElement = initJSDOM();

beforeAll(async () =>
{

    InitPnpTest();

    const file = await sp.web.rootFolder.folders.getByName("SiteAssets").files.add(fName, fContent);
    testFileInfo = file.data;
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