import { compareArray } from "../../src/utils/compareArray";

test('Equal array comparison is', () =>
{
    const a = [1, 2, 3, 4, 5, 6, 7];
    const b = [1, 2, 3, 4, 5, 6, 7];

    expect(compareArray(a, b)).toBe(true);
});

test('Different type array check is', () =>
{
    const a = ["1", 2, "3", 4, 5, 6, 7];
    const b = [1, 2, 3, 4, 5, 6, 7];

    expect(compareArray(a, b)).toBe(false);
});

test('Different element order is', () =>
{
    const a = [4, 5, 6, 7, 2, 3, 1];
    const b = [1, 2, 3, 4, 5, 6, 7];

    expect(compareArray(a, b)).toBe(true);
});

test('Different element(number) size is', () =>
{
    const a = [4, 5, 2, 3, 1];
    const b = [1, 2, 3, 4, 5, 7];

    expect(compareArray(a, b)).toBe(false);
});

test('Different element(string) size is', () =>
{
    const a = ["4", "5", "2", "3", "1"];
    const b = ["1", "2", "3", "4", "5", "7"];

    expect(compareArray(a, b)).toBe(false);
});

test('Repeating element(string) is', () =>
{
    const a = ["4", "1", "5", "1", "2", "3", "1"];
    const b = ["4", "1", "5", "1", "2", "3", "1"];

    expect(compareArray(a, b)).toBe(true);
});

test('Same reference is', () =>
{
    const a = ["4", "1", "5", "1", "2", "3", "1"];

    expect(compareArray(a, a)).toBe(true);
});