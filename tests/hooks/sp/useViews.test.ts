import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useView, useViews } from "../../../src";
import { IViewInfo } from "@pnp/sp/views";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let listInfo: IListInfo;
let viewInfo: IViewInfo;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];
    viewInfo = await spTest.web.lists.getById(listInfo.Id).defaultView();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useViews get all views", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useViews(listInfo.Id, {
            query: {
                top: 2
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useViews get all views", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useView get view by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useView(listInfo.Id, viewInfo.Id, {
            query: {
                select: ["*"],
                expand: ["viewfields"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("uuseView get view by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useView get view by title", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useView(listInfo.Id, viewInfo.Title, {
            query: {
                select: ["*"],
                expand: ["viewfields"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("uuseView get view by title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useView get default view", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useView(listInfo.Id, undefined, {
            query: {
                select: ["*"],
                expand: ["viewfields"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(async () =>
    {
        const response: IViewInfo = await reactDOMElement.mountTestComponent("uuseView get default view", CustomHookMockup, props);
        expect(response?.Id).toBe(viewInfo.Id);
    });
});

test("useView view id with invalid type", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useView(listInfo.Id, <any>{}, {
            query: {
                select: ["*"],
                expand: ["viewfields"]
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useView view id with invalid type", CustomHookMockup, props))
            .rejects.toThrow("viewId value type is not string or undefined."));
});