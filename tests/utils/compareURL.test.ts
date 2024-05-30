import { compareURL } from "../../src/utils/compare";

test("A and B are same", () => {
  const a = "https://test.com/sites/subsite";
  const b = a.toUpperCase();

  expect(compareURL(a, b)).toBe(true);
});

test("A and B are same and has unicode characters", () => {
  const a = "https://test.com/sites/subsite/_test-file乇乂ㄒ尺卂.json";
  const b = a.toUpperCase();

  expect(compareURL(a, b)).toBe(true);
});

test("A and B are not same", () => {
  const a = "https://test.com/sites/subsite/_test-file乇乂ㄒ尺卂.json";
  const b = "https://test.com/sites/subsite/";

  expect(compareURL(a, b)).toBe(false);
});

test("A and B are same path but has additional / character", () => {
  const a = "/subsite/乇乂ㄒ尺卂";
  const b = `${a}/`;

  expect(compareURL(a, b)).toBe(true);
});

test("A and B are empty", () => {
  const a = "";
  const b = "";

  expect(compareURL(a, b)).toBe(true);
});

test("A and B are '/'", () => {
  const a = "/";
  const b = "/";

  expect(compareURL(a, b)).toBe(true);
});
