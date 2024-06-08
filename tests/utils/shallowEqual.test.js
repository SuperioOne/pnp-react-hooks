import { shallowEqual } from "../../src/utils/shallowEqual";
import { test, expect } from "vitest";

test("Obj A is equal to B", () => {
  const a = {
    numeric: 1,
    array: [],
    text: "value",
    obj: {},
  };

  const b = a;

  expect(shallowEqual(a, b)).toBe(true);
});

test("Obj A is shallow equal to B", () => {
  const arr = [];
  const obj = {
    subProp: "subprop",
  };

  const a = {
    numeric: 1,
    array: arr,
    text: "value",
    obj: obj,
  };

  const b = {
    numeric: 1,
    array: arr,
    text: "value",
    obj: obj,
  };

  expect(shallowEqual(a, b)).toBe(true);
});

// Has different array references
test("Obj A is not shallow equal to B", () => {
  const a = {
    numeric: 1,
    array: [],
    text: "value",
  };

  const b = {
    numeric: 1,
    array: [],
    text: "value",
  };

  expect(shallowEqual(a, b)).toBe(false);
});

test("Obj A has more properties than B", () => {
  const a = {
    numeric: 1,
    text: "value",
    text2: "value",
    nullVal: null,
    undefined: undefined,
  };

  const b = {
    numeric: 1,
    text: "value",
  };

  expect(shallowEqual(a, b)).toBe(false);
});

test("Obj A is null", () => {
  const a = null;

  const b = {
    numeric: 1,
    text: "value",
  };

  expect(shallowEqual(a, b)).toBe(false);
});

test("Obj A is undefined", () => {
  const a = undefined;

  const b = {
    numeric: 1,
    text: "value",
  };

  expect(shallowEqual(a, b)).toBe(false);
});

test("String A equal String B", () => {
  const a = "*";
  const b = "*";

  expect(shallowEqual(a, b)).toBe(true);
});

test("Null not equal String B", () => {
  const a = null;
  const b = "*";

  expect(shallowEqual(a, b)).toBe(false);
});
