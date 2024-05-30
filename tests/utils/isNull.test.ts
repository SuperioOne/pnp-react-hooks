import { isNull } from "../../src/utils/is";

test("0 value", () => {
  expect(isNull(0)).toBe(false);
});

test("1 value", () => {
  expect(isNull(1)).toBe(false);
});

test("{} value", () => {
  expect(isNull({})).toBe(false);
});

test("null value", () => {
  expect(isNull(null)).toBe(true);
});

test("undefined value", () => {
  expect(isNull(undefined)).toBe(true);
});

test("'undefined' string value", () => {
  expect(isNull("undefined")).toBe(false);
});
