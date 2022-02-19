import { ODataQueryable, ODataQueryableCollection } from "../../src/types/ODataQueryable";
import { deepCompareQuery } from "../../src/utils/deepCompare";

test("Query equal queryable", () =>
{
    const a: ODataQueryable = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"]
    };

    const b: ODataQueryable = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"]
    };

    expect(deepCompareQuery(a, b)).toBe(true);
});

test("Query same reference", () =>
{
    const a: ODataQueryable = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"]
    };
    const b = a;

    expect(deepCompareQuery(a, b)).toBe(true);
});

test("Query different properties", () =>
{
    const a: ODataQueryable = {
        expand: ["Value1/Value", "Value1/Value2"],
    };

    const b: ODataQueryable = {
        select: ["Value", "Text", "Title", "Id"]
    };

    expect(deepCompareQuery(a, b)).toBe(false);
});

test("Query different values", () =>
{
    const a: ODataQueryable = {
        select: ["Value", "Text", "Title", "Id"]
    };

    const b: ODataQueryable = {
        select: ["Value", "Text", "Title", "None"]
    };

    expect(deepCompareQuery(a, b)).toBe(false);
});

test("Query undefined value", () =>
{
    const a: ODataQueryable = {
        select: ["Value", "Text", "Title", "Id"]
    };

    const b = undefined;

    expect(deepCompareQuery(a, b)).toBe(false);
});

test("Query collection equal queries", () =>
{
    const a: ODataQueryableCollection = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0
    };

    const b: ODataQueryableCollection = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0
    };

    expect(deepCompareQuery(a, b)).toBe(true);
});

test("Query collection same reference", () =>
{
    const a: ODataQueryableCollection = {
        expand: ["Value1/Value", "Value1/Value2"],
        select: ["Value", "Text", "Title", "Id"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0
    };
    const b = a;

    expect(deepCompareQuery(a, b)).toBe(true);
});

test("Query collectiond different properties", () =>
{
    const a: ODataQueryableCollection = {
        expand: ["Value1/Value", "Value1/Value2"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0
    };

    const b: ODataQueryableCollection = {
        select: ["Value", "Text", "Title", "Id"],
        filter: "Title eq 'test'",
        orderyByAscending: true,
        skip: 0
    };

    expect(deepCompareQuery(a, b)).toBe(false);
});

test("Query collection different values", () =>
{
    const a: ODataQueryableCollection = {
        expand: ["Value1/Value", "Value1/Value2"],
        filter: "Text eq 'test'",
        orderBy: "Title",
        orderyByAscending: false,
        skip: 0
    };

    const b: ODataQueryableCollection = {
        expand: ["Value1/Value0", "Value1/Value5"],
        filter: "Text eq 'Foobar'",
        orderBy: "ID",
        orderyByAscending: true,
        skip: 50
    };

    expect(deepCompareQuery(a, b)).toBe(false);
});

test("Query collection undefined value", () =>
{
    const a: ODataQueryableCollection = {
        select: ["Value", "Text", "Title", "Id"],
        filter: "Fuubar gt 53"
    };

    const b = undefined;

    expect(deepCompareQuery(a, b)).toBe(false);
});