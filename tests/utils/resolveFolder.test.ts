import { Web } from "@pnp/sp/webs";
import { resolveFolder } from "../../src/sp/resolvers";

test("resolveFolder by GUID", () => {
  expect(() =>
    resolveFolder(
      Web("http://test.com"),
      "e4c7f8dd-b111-4df4-b419-4892bc0a0545",
    ),
  ).not.toThrow();
});

test("resolveFolder by relative url", () => {
  expect(() =>
    resolveFolder(Web("http://test.com"), "/test/test/test.jpg"),
  ).not.toThrow();
});

test("resolveFolder by incorrect relative url", () => {
  expect(() =>
    resolveFolder(Web("http://test.com"), "//test/test/test.jpg"),
  ).toThrow();
});

test("resolveFolder empty string", () => {
  expect(() => resolveFolder(Web("http://test.com"), "     ")).toThrow();
});

test("resolveFolder full URL", () => {
  expect(() =>
    resolveFolder(Web("http://test.com"), "http://test.com/test/test.jpg"),
  ).toThrow();
});

