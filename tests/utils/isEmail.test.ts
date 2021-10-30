import { isEmail } from "../../src/utils/isEmail";

test("Valid Email", () =>
{
    expect(isEmail("test.test@test.com")).toBe(true);
});

test("Invalid double dot Email", () =>
{
    expect(isEmail("te..st@test.com")).toBe(false);
});

test("Reserved character Email", () =>
{
    expect(isEmail("te;st@test.com")).toBe(false);
});

test("Unicode Email", () =>
{
    expect(isEmail("乇乂ㄒ尺卂@test.com")).toBe(true);
});

test("Empty string", () =>
{
    expect(isEmail("")).toBe(false);
});

test("Missing @ Symbol", () =>
{
    expect(isEmail("testtest.com")).toBe(false);
});

test("Email with allowed max character", () =>
{
    const email = `${"a".repeat(64)}@${"b".repeat(255)}`;

    expect(isEmail(email)).toBe(true);
});

test("Email with over allowed max character", () =>
{
    const email = `${"a".repeat(65)}@${"b".repeat(255)}`;

    expect(isEmail(email)).toBe(false);
});

test("Email with over allowed max unicode octet", () =>
{
    const email = `${"乇".repeat(64 / 3 + 1)}@${"b".repeat(255)}`;

    expect(isEmail(email)).toBe(false);
});