import { checkDisable, defaultCheckDisable } from "../../src/utils/checkDisable";

test('disable by boolean true type', () =>
{
    expect(checkDisable(true)).toBe(true);
});

test('disable by boolean false type', () =>
{
    expect(checkDisable(false)).toBe(false);
});

test('disable by undefined value', () =>
{
    expect(checkDisable(undefined)).toBe(false);
});

test('disable by auto with valid parameters', () =>
{
    expect(checkDisable("auto", defaultCheckDisable, false, "string value", [], 1, { randomObj: 234 })).toBe(false);
});

test('disable by auto with invalid parameters (empty string)', () =>
{
    expect(checkDisable("auto", defaultCheckDisable, "")).toBe(true);
});

test('disable by auto with invalid parameters (undefined)', () =>
{
    expect(checkDisable("auto", defaultCheckDisable, undefined)).toBe(true);
});

test('disable by auto with invalid parameters (null)', () =>
{
    expect(checkDisable("auto", defaultCheckDisable, null)).toBe(true);
});

test('disable by auto with invalid parameters (number less than 1)', () =>
{
    expect(checkDisable("auto", defaultCheckDisable, 0)).toBe(true);
});

test('disable by custom function when value is even number', () =>
{
    // disable(true) when
    const evenNumberCheck = (value: number) => value % 2 === 0;

    expect(checkDisable(evenNumberCheck, defaultCheckDisable, 4)).toBe(true);
});

test('disable by custom function when value is odd number', () =>
{
    // disable(true) when number is odd
    const oddNumberCheck = (value: number) => value % 2 === 1;

    expect(checkDisable(oddNumberCheck, defaultCheckDisable, 4)).toBe(false);
});

test('do not disable, if auto selected but no default check function given', () =>
{
    expect(checkDisable("auto")).toBe(false);
});

test('disable by custom function without parameter', () =>
{
    const disableFunc = () => true;

    expect(checkDisable(disableFunc)).toBe(true);
});