import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useChanges } from "../../src";

const reactDOMElement = initJSDOM();
let listInfo: IListInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const listInfos = await sp.web.lists.top(1).get();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useChanges get web changes", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useChanges({
            Item: true,
            File: true,
            List: true,
            Update: true,
            Web: true,
            SystemUpdate: true,
            DeleteObject: true
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get web changes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useChanges get list changes by list Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useChanges(
            {
                Item: true,
                File: true,
                List: true,
                Update: true,
                Web: true,
                SystemUpdate: true,
                DeleteObject: true
            },
            {
                list: listInfo.Id
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get list changes by list Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useChanges get list changes by list title", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useChanges(
            {
                Item: true,
                File: true,
                List: true,
                Update: true,
                Web: true,
                SystemUpdate: true,
                DeleteObject: true
            },
            {
                list: listInfo.Title
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get list changes by list title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});