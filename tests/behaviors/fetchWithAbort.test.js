import "@pnp/sp/webs";
import {
  ABORT_SUPPORT,
  browserFetchRetry,
} from "../../src/behaviors/internals";
import { FetchWithAbort } from "../../src/behaviors/index";
import { afterAll, beforeEach, expect, test, vitest } from "vitest";
import { spfi } from "@pnp/sp";

beforeEach(() => {
  vitest.restoreAllMocks();
});

afterAll(() => {
  vitest.restoreAllMocks();
});

test("browser-fetch retry test with custom retry count", async () => {
  const mockFetch = vitest.spyOn(global, "fetch");
  const retryCount = 6;

  mockFetch.mockImplementation(
    () =>
      new Promise((resolve) =>
        resolve(new Response(undefined, { status: 408 })),
      ),
  );

  try {
    await browserFetchRetry("/mock-api-call/request-time-out-408", {
      retry: retryCount,
    });
  } catch (err) {
    expect(err.response.status).toBe(408);
  }

  expect(mockFetch).toBeCalledTimes(retryCount);
});

test("browser-fetch retry test for all codes", async () => {
  const mockFetch = vitest.spyOn(global, "fetch");

  for (const code of [408, 429, 503, 504]) {
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve(new Response(undefined, { status: code })),
        ),
    );

    try {
      await browserFetchRetry(`/mock-api-call/${code}`);
    } catch (err) {
      expect(err.response.status).toBe(code);
    }

    expect(mockFetch).toBeCalledTimes(3);
    mockFetch.mockClear();
  }
});

test("browser-fetch network error", async () => {
  const mockFetch = vitest.spyOn(global, "fetch");

  mockFetch.mockImplementation(() => {
    throw new Error("NetworkError");
  });

  await expect(
    browserFetchRetry("/mock-api-call/fetch-network-error"),
  ).rejects.toThrowError("NetworkError");

  expect(mockFetch).toBeCalledTimes(1);
});

test("browser-fetch abort signal", async () => {
  const controller = new AbortController();
  controller.abort();

  try {
    await browserFetchRetry("https://localhost/mock-api-call/fetch-aborted", {
      request: { signal: controller.signal },
    });
  } catch (err) {
    expect(err.name).toBe("AbortError");
  }
});

test("FetchWithAbort behavior, abort flag check", async () => {
  const queryableWithAbort = spfi().using(FetchWithAbort()).web;
  const sendObservers = queryableWithAbort.on.send.toArray();

  expect(sendObservers.length).toBe(1);
  expect(sendObservers[0][ABORT_SUPPORT]).toBe(true);
});
