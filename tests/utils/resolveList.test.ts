import { Web } from "@pnp/sp/webs";
import { resolveList } from "../../src/utils/resolveList";

test('resolveList by GUID', () =>
{
    expect(() => resolveList(Web("http://test.com"), "e4c7f8dd-b111-4df4-b419-4892bc0a0545")).not.toThrow();
});

test('resolveList by Title', () =>
{
    expect(() => resolveList(Web("http://test.com"), "Title")).not.toThrow();
});

test('resolveList by whitespace only string', () =>
{
    expect(() => resolveList(Web("http://test.com"), "     ")).toThrow();
});
