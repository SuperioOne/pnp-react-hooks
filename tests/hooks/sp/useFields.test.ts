import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { IFieldInfo } from "@pnp/sp/fields";
import { IListInfo } from "@pnp/sp/lists/types";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useField, useFields } from "../../../src";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let listInfo: IListInfo;
let listFieldInfo: IFieldInfo;
let webFieldInfo: IFieldInfo;

beforeAll(async () =>
{
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();

    const listInfos = await spTest.web.lists.top(1)();

    if (listInfos?.length < 1)
        throw new Error("Unable to find list");

    listInfo = listInfos[0];

    const [listFields, webFields] = await Promise.all([
        spTest.web.lists.getById(listInfo.Id).fields.top(1)(),
        spTest.web.fields.top(1)()
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
        useHook: (err) => useFields({
            query: {
                top: 2
            },
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFields get web fields", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFields get list fields", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useFields({
            query: {
                top: 2
            },
            list: listInfo.Id,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useFields get list fields", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useFields get web field by Id", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useField(webFieldInfo.Id, {
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useField get web field by Id", CustomHookMockup, props))
            .resolves.toBeTruthy());
});

test("useField get list field by internal name", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useField(listFieldInfo.InternalName, {
            list: listInfo.Id,
            sp: spTest,
            error: err
        })
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useField get list field by internal name", CustomHookMockup, props))
            .resolves.toBeTruthy());
});