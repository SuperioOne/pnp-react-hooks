import { isUrl, UrlType } from "../../src/utils/is";

test("Valid relative path", () => {
  expect(isUrl("/sub/path/test", UrlType.Relative)).toBe(true);
});

test("Valid / relative path", () => {
  expect(isUrl("/", UrlType.Relative)).toBe(true);
});

test("Valid absolute path", () => {
  expect(isUrl("https://test.com/sub/path/test", UrlType.Absolute)).toBe(true);
});

test("Invalid absolute path", () => {
  expect(isUrl("/sub/path/test", UrlType.Absolute)).toBe(false);
});

test("Invalid relative path", () => {
  expect(isUrl("https://test.com/sub/path/test", UrlType.Relative)).toBe(false);
});

test("UrlType.All absolute Url check", () => {
  expect(isUrl("https://test.com/sub/path/test")).toBe(true);
});

test("UrlType.All relative Url check", () => {
  expect(isUrl("/sub/path/test")).toBe(true);
});

test("Invalid Url", () => {
  expect(isUrl("ht:://sub/path/test")).toBe(false);
});

