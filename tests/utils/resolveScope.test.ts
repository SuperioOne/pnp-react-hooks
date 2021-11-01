import { _Item } from "@pnp/sp/items/types";
import { _List } from "@pnp/sp/lists/types";
import { Web } from "@pnp/sp/webs";
import { _Web } from "@pnp/sp/webs/types";
import { resolveScope } from "../../src/utils/resolveScope";

test("List scope", () =>
{
    const web = Web("https://test.com");

    const t = resolveScope(web, {
        list: "List Title"
    });

    expect(t instanceof _List).toBe(true);
});

test("Web scope", () =>
{
    const web = Web("https://test.com");

    const t = resolveScope(web, {});

    expect(t instanceof _Web).toBe(true);
});

test("Item scope", () =>
{
    const web = Web("https://test.com");

    const t = resolveScope(web, {
        item: 123,
        list: "List Title"
    });

    expect(t instanceof _Item).toBe(true);
});

test("Item scope missing list Id", () =>
{
    const web = Web("https://test.com");

    expect(() => resolveScope(web, {
        item: 123,
    })).toThrowError();
});

test("Item scope invalid list Id", () =>
{
    const web = Web("https://test.com");

    expect(() => resolveScope(web, {
        item: 123,
        list: " "
    })).toThrowError();
});

test("Item scope invalid item Id", () =>
{
    const web = Web("https://test.com");

    expect(() => resolveScope(web, {
        item: 0,
        list: "List Title"
    })).toThrowError();
});