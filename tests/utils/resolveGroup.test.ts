import { Web } from "@pnp/sp/webs/types";
import { resolveGroup } from "../../src/utils/resolveGroup";

test('resolveGroup by numeric Id', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), 123)).not.toThrow();
});

test('resolveGroup by name', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), "Group Name")).not.toThrow();
});

test('resolveGroup by NaN numeric Id', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), NaN)).toThrow();
});

test('resolveGroup by 0 numeric Id', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), 0)).toThrow();
});

test('resolveGroup by negative number', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), -1)).toThrow();
});

test('resolveGroup by whitespace only name', () =>
{
    expect(() => resolveGroup(Web("http://test.com"), "      ")).toThrow();
});