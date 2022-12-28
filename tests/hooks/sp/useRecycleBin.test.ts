import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useRecycleBinItems } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useRecycleBinItems get recycle bin items (default scope)", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRecycleBinItems({
            sp: spTest,
            error: err,
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRecycleBinItems get recycle bin items (default scope)", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRecycleBinItems get recycle bin items", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRecycleBinItems({
            sp: spTest,
            error: err,
            scope: "web"
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRecycleBinItems get recycle bin items", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRecycleBinItems get recycle bin items with query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRecycleBinItems({
            sp: spTest,
            error: err,
            scope: "web",
            query: {
                top: 2,
                select: ["Title", "ItemState"],
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRecycleBinItems get site recycle bin items with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRecycleBinItems get site recycle bin items", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRecycleBinItems({
            sp: spTest,
            error: err,
            scope: "site"
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRecycleBinItems get site recycle bin items", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useRecycleBinItems get site recycle bin items with query", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useRecycleBinItems({
            sp: spTest,
            error: err,
            scope: "site",
            query: {
                top: 2,
                select: ["Title", "ItemState"],
            }
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useRecycleBinItems get site recycle bin items with query", CustomHookMockup, props))
            .resolves.toBeTruthy());
});