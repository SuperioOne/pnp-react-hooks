import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { SPFI } from "@pnp/sp";
import { useChanges } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let listInfo: IListInfo;

beforeAll(async () =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useChanges get web changes", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useChanges({
            Item: true,
            File: true,
            List: true,
            Update: true,
            Web: true,
            SystemUpdate: true,
            DeleteObject: true
        }, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get web changes", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useChanges get list changes by list Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useChanges(
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
                list: listInfo.Id,
                sp: spTest,
                error: err
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get list changes by list Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useChanges get list changes by list title", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useChanges(
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
                list: listInfo.Title,
                sp: spTest,
                error: err
            })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useChanges get list changes by list title", CustomHookMockup, props))
            .resolves.toBeTruthy());
});