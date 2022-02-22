import { CustomHookMockup, CustomHookProps } from "../../tools/mockups/CustomHookMockup";
import { ISearchQuery } from "@pnp/sp/search/types";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useSearch } from "../../../src";
import { SPFI } from "@pnp/sp";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() =>
{
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});
afterEach(() => reactDOMElement.unmountComponent());

test("useSearch search by search query", async () =>
{
    const searchQuery: ISearchQuery = {
        Querytext: "*",
        RowLimit: 5,
        RowsPerPage: 5,
        SelectProperties: ["Title"]
    };

    const props: CustomHookProps = {
        useHook: (err) => useSearch(searchQuery, {
            sp: spTest,
            error: err
        }),
        completeWhen: (data) => data[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useSearch search by search query", CustomHookMockup, props);
        expect(data[0]).toBeTruthy();
    });
});

test("useSearch search by search text", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSearch("*", {
            sp: spTest,
            error: err
        }),
        completeWhen: (data) => data[0] !== undefined
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useSearch search by search text", CustomHookMockup, props);
        expect(data[0]).toBeTruthy();
    });
});

test("useSearch get second page", async () =>
{
    const props: CustomHookProps = {
        useHook: (err) => useSearch("*", {
            sp: spTest,
            error: err
        }),
        completeWhen: (data) =>
        {
            if (data[0]?.CurrentPage === 1)
            {
                data[1](2);
            }

            return data[0]?.CurrentPage === 2;
        }
    };

    await act(async () =>
    {
        const data = await reactDOMElement.mountTestComponent("useSearch get second page", CustomHookMockup, props);
        expect(data[0]).toBeTruthy();
    });
});