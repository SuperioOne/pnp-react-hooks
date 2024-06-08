import { test, expect } from "vitest";
import { deepCompareQuery } from "../../src/sp/deepCompare";

test("Query equal queryable", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
      },
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
      },
    ),
  ).toBe(true);
});

test("Query same reference", () => {
  const a = {
    expand: ["Value1/Value", "Value1/Value2"],
    select: ["Value", "Text", "Title", "Id"],
  };
  const b = a;

  expect(deepCompareQuery(a, b)).toBe(true);
});

test("Query different properties", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
      },
      {
        select: ["Value", "Text", "Title", "Id"],
      },
    ),
  ).toBe(false);
});

test("Query different values", () => {
  expect(
    deepCompareQuery(
      {
        select: ["Value", "Text", "Title", "Id"],
      },
      {
        select: ["Value", "Text", "Title", "None"],
      },
    ),
  ).toBe(false);
});

test("Query undefined value", () => {
  expect(
    deepCompareQuery(
      {
        select: ["Value", "Text", "Title", "Id"],
      },
      undefined,
    ),
  ).toBe(false);
});

test("Query collection equal queries", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
    ),
  ).toBe(true);
});

test("Query collection same reference", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
      {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
    ),
  ).toBe(true);
});

test("Query collectiond different properties", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
      {
        select: ["Value", "Text", "Title", "Id"],
        filter: "Title eq 'test'",
        orderyByAscending: true,
        skip: 0,
      },
    ),
  ).toBe(false);
});

test("Query collection different values", () => {
  expect(
    deepCompareQuery(
      {
        expand: ["Value1/Value", "Value1/Value2"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0,
      },
      {
        expand: ["Value1/Value0", "Value1/Value5"],
        filter: "Text eq 'Foobar'",
        orderBy: "ID",
        orderyByAscending: true,
        skip: 50,
      },
    ),
  ).toBe(false);
});

test("Query collection undefined value", () => {
  expect(
    deepCompareQuery(
      {
        select: ["Value", "Text", "Title", "Id"],
        filter: "Fuubar gt 53",
      },
      undefined,
    ),
  ).toBe(false);
});
