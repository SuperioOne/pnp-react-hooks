import { compareArray } from "../../src/utils/compare";

test("Equal array comparison", () => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  const b = [1, 2, 3, 4, 5, 6, 7];

  expect(compareArray(a, b)).toBe(true);
});

test("Different type array check", () => {
  const a = ["1", 2, "3", 4, 5, 6, 7];
  const b = [1, 2, 3, 4, 5, 6, 7];

  expect(compareArray(a, b)).toBe(false);
});

test("Different element order", () => {
  const a = [4, 5, 6, 7, 2, 3, 1];
  const b = [1, 2, 3, 4, 5, 6, 7];

  expect(compareArray(a, b)).toBe(true);
});

test("Different element(number) size", () => {
  const a = [4, 5, 2, 3, 1];
  const b = [1, 2, 3, 4, 5, 7];

  expect(compareArray(a, b)).toBe(false);
});

test("Different element(string) size", () => {
  const a = ["4", "5", "2", "3", "1"];
  const b = ["1", "2", "3", "4", "5", "7"];

  expect(compareArray(a, b)).toBe(false);
});

test("Repeating element(string)", () => {
  const a = ["4", "1", "5", "1", "2", "3", "1"];
  const b = ["4", "1", "5", "1", "2", "3", "1"];

  expect(compareArray(a, b)).toBe(true);
});

test("Same reference", () => {
  const a = ["4", "1", "5", "1", "2", "3", "1"];

  expect(compareArray(a, a)).toBe(true);
});

test("null reference", () => {
  const a = ["4", "1", "5", "1", "2", "3", "1"];
  const b = null;

  expect(compareArray(a, b)).toBe(false);
});

test("undefined value", () => {
  const a = ["4", "1", "5", "1", "2", "3", "1"];
  const b = undefined;

  expect(compareArray(a, b)).toBe(false);
});

