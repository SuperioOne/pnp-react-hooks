import { isURL, UrlType } from "../../src/utils/isURL";

test("Valid relative path", () =>
{
    expect(isURL("/sub/path/test", UrlType.Relative)).toBe(true);
});

test("Valid absolute path", () =>
{
    expect(isURL("https://test.com/sub/path/test", UrlType.Absolute)).toBe(true);
});

test("Invalid absolute path", () =>
{
    expect(isURL("/sub/path/test", UrlType.Absolute)).toBe(false);
});

test("Invalid relative path", () =>
{
    expect(isURL("https://test.com/sub/path/test", UrlType.Relative)).toBe(false);
});

test("UrlType.All absolute Url check", () =>
{
    expect(isURL("https://test.com/sub/path/test")).toBe(true);
});

test("UrlType.All relative Url check", () =>
{
    expect(isURL("/sub/path/test")).toBe(true);
});

test("Invalid Url", () =>
{
    expect(isURL("ht:://sub/path/test")).toBe(false);
});