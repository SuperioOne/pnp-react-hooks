import { CustomHookMockup, CustomHookProps } from "../testUtils/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM } from "../testUtils/ReactDOMElement";
import { spfi as sp } from "@pnp/sp";
import { useField, useFields } from "../../src";
import { IFieldInfo } from "@pnp/sp/fields";

const reactDOMElement = initJSDOM();
let listInfo: IListInfo;
let listFieldInfo: IFieldInfo;
let webFieldInfo: IFieldInfo;

beforeAll(async () =>
{
    InitPnpTest();

    const listInfos = await sp().web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];

    const [listFields, webFields] = await Promise.all([
        sp().web.lists.getById(listInfo.Id).fields.top(1)(),
        sp().web.fields.top(1)()
    ]);

    if (listFields?.length < 1 || webFields?.length < 1)
        throw new Error("Field info is empty");

    listFieldInfo = listFields[0];
    webFieldInfo = webFields[0];
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

test("useFields get web field by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useField(webFieldInfo.Id)
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useField get web field by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useField get list field by internal name", async () =>
{
    const props: CustomHookProps = {
        useHook: () => useField(listFieldInfo.InternalName, {
            list: listInfo.Id
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useField get list field by internal name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});