import { useSearch } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

afterEach(cleanup);

test("useSearch, search by search query", async () => {
  const hook = renderHook(() =>
    useSearch(
      {
        Querytext: "*",
        RowLimit: 5,
        RowsPerPage: 5,
        SelectProperties: ["Title"],
      },
      { sp: spTest },
    ),
  );

  await waitFor(() => {
    const [searchResult] = hook.result.current;

    expect(searchResult).toBeTypeOf("object");
    expect(searchResult).toBeTruthy();

    logResponse("Search result by object query", searchResult);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useSearch, search by search text", async () => {
  const hook = renderHook(() => useSearch("*", { sp: spTest }));

  await waitFor(() => {
    const [searchResult] = hook.result.current;

    expect(searchResult).toBeTypeOf("object");
    expect(searchResult).toBeTruthy();

    logResponse("Search result by text query", searchResult);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useSearch, get multi page", async () => {
  /** @type{import("../../../src").GetPageDispatch } **/
  let pageHandle;
  let pageNo = 1;
  const hook = renderHook(() => useSearch("*", { sp: spTest }));

  await waitFor(() => {
    const [searchResult, getPage] = hook.result.current;

    expect(searchResult).toBeTypeOf("object");
    expect(searchResult).toBeTruthy();

    pageHandle = getPage;
  }, DEFAULT_WAITFOR_OPTS);

  while (pageNo < 5) {
    pageNo += 1;

    await new Promise((resolve, reject) => {
      pageHandle(pageNo, (response, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    await waitFor(() => {
      const [searchResult] = hook.result.current;

      expect(searchResult).toBeTypeOf("object");
      expect(searchResult).toBeTruthy();
      expect(searchResult?.currentPage).toBe(pageNo);

      logResponse(`Search Page ${pageNo}`, searchResult);
    }, DEFAULT_WAITFOR_OPTS);
  }
});

