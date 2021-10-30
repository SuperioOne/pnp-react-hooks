import "@pnp/sp/site-users";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs/types";
import { resolveUser } from "../../src/utils/resolveUser";

test('resolveUser by numeric Id', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, 123)).not.toThrow();
});

test('resolveUser by email', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, "test@test.com")).not.toThrow();
});

test('resolveUser by login name', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, "i:0#.s|test@test.com")).not.toThrow();
});

test('resolveUser by NaN numeric Id', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, NaN)).toThrow();
});

test('resolveUser by 0 numeric Id', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, 0)).toThrow();
});

test('resolveUser by negative number', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, -1)).toThrow();
});

test('resolveUser by whitespace only name', () =>
{
    expect(() => resolveUser(Web("http://test.com").siteUsers, "      ")).toThrow();
});