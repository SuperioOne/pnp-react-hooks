import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { sp } from "@pnp/sp";
import { useFields } from "../../src";

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

test("useFields get web fields", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFields({
            query: {
                top: 2
            },
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFields get web fields", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFields get list fields", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useFields({
            query: {
                top: 2
            },
            list: listInfo.Id
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFields get list fields", CustomHookMockup, props))
            .resolves.toBeTruthy());
});