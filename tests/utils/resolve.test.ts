import { Web } from "@pnp/sp/webs";
import { resolveFolder } from "../../src/utils/resolveFolder";
// import { resolveGroup } from "../../src/utils/resolveGroup";
// import { resolveList } from "../../src/utils/resolveList";
// import { resolveScope } from "../../src/utils/resolveScope";
// import { resolveUser } from "../../src/utils/resolveUser";
// import { resolveWeb } from "../../src/utils/resolveWeb";

test('resolveFolder by GUID', () =>
{
    expect(() => resolveFolder(Web("http://test.com"), "e4c7f8dd-b111-4df4-b419-4892bc0a0545")).not.toThrow();
});

test('resolveFolder by relative url', () =>
{
    expect(() => resolveFolder(Web("http://test.com"), "/test/test/test.jpg")).not.toThrow();
});

test('resolveFolder by incorrect relative url', () =>
{
    expect(() => resolveFolder(Web("http://test.com"), "//test/test/test.jpg")).toThrow();
});

test('resolveFolder empty string', () =>
{
    expect(() => resolveFolder(Web("http://test.com"), "     ")).toThrow();
});

test('resolveFolder full URL', () =>
{
    expect(() => resolveFolder(Web("http://test.com"), "http://test.com/test/test.jpg")).toThrow();
});