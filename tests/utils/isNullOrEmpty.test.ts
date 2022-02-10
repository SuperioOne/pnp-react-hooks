import { isNullOrEmpty } from "../../src/utils/isNullOrEmpty";

test("0 value", () =>
{
    expect(isNullOrEmpty(0)).toBe(false);
});

test("1 value", () =>
{
    expect(isNullOrEmpty(1)).toBe(false);
});

test("{} value", () =>
{
    expect(isNullOrEmpty({})).toBe(false);
});

test("null value", () =>
{
    expect(isNullOrEmpty(null)).toBe(true);
});

test("undefined value", () =>
{
    expect(isNullOrEmpty(undefined)).toBe(true);
});

test("'undefined' string value", () =>
{
    expect(isNullOrEmpty("undefined")).toBe(false);
});