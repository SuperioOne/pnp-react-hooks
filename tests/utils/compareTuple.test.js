import { compareTuples } from "../../src/utils/compare";
import { test, expect } from "vitest";

test("A and B is equal", () => {
  const a = [1, 2, "3", "5"];
  const b = [1, 2, "3", "5"];

  expect(compareTuples(a, b)).toBe(true);
});

test("A and B are same reference", () => {
  const a = [1, 2, "3", "5"];
  const b = a;

  expect(compareTuples(a, b)).toBe(true);
});

test("A is undefined", () => {
  const b = [1, 2, "3", "5"];
  const a = undefined;

  expect(compareTuples(a, b)).toBe(false);
});

test("A is null", () => {
  const b = [1, 2, "3", "5"];
  const a = null;

  expect(compareTuples(a, b)).toBe(false);
});

test("A has more elements", () => {
  const b = [1, 2, "3", "5"];
  const a = [1, 2, "3", "5", "7"];

  expect(() => compareTuples(a, b)).toThrowError();
});

test("A has different order", () => {
  const a = [1, 2, "3", "5", "7"].reverse();
  const b = [1, 2, "3", "5", "7"];

  expect(compareTuples(a, b)).toBe(false);
});

test("A has different order", () => {
  const a = [1, 2, "3", "5", "7"].reverse();
  const b = [1, 2, "3", "5", "7"];

  expect(compareTuples(a, b)).toBe(false);
});

test("A and B is empty", () => {
  const a = [];
  const b = [];

  expect(compareTuples(a, b)).toBe(true);
});

test("A and B is undefined", () => {
  const a = undefined;
  const b = undefined;

  expect(compareTuples(a, b)).toBe(true);
});
