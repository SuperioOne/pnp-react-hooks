import { isUUID } from "../../src/utils/isUUID";

test("Valid GUID", () =>
{
    expect(isUUID("43a7fafa-9b8b-4e07-a211-7896658d4fd0")).toBe(true);
});

test("Invalid GUID version v15", () =>
{
    expect(isUUID("43a7fafa-9b8b-fe07-a211-7896658d4fd0")).toBe(false);
});

test("Valid GUID version v3", () =>
{
    expect(isUUID("43a7fafa-9b8b-3e07-a211-7896658d4fd0")).toBe(true);
});

test("Case insensitive valid Guid", () =>
{
    expect(isUUID("43AFfafA-9B8b-4E07-a211-7896658D4fd0")).toBe(true);
});

test("Invalid clock_seq_hi_and_reserved value", () =>
{
    expect(isUUID("43a7fafa-9b8b-4e07-c211-7896658d4fd0")).toBe(false);
});