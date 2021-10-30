import { Web } from "@pnp/sp/webs";
import { WebOptions } from "../../src/types";
import { resolveWeb } from "../../src/utils/resolveWeb";

test('resolveWeb by web object', () =>
{
    const option: WebOptions = {
        web: Web("http://test.com")
    };

    expect(() => resolveWeb(option)).not.toThrow();
});

test('use default web', () =>
{
    const option: WebOptions = {};

    expect(() => resolveWeb(option)).not.toThrow();
});

test('resolveWeb by string url', () =>
{
    const option: WebOptions = {
        web: "http://test.com"
    };

    expect(() => resolveWeb(option)).not.toThrow();
});

test('try resolveWeb by relative url', () =>
{
    const option: WebOptions = {
        web: "/sites/test"
    };

    expect(() => resolveWeb(option)).toThrow();
});