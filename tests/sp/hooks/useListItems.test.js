import { useListItem, useListItems, useListItemsMode } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";
import { useRegionalSetting } from "../../../src";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let testList;
/** @type{{Id:number}} **/
let testListItem;

afterEach(cleanup);

beforeAll(async () => {
  spTest = InitPnpTest();

  testList = await spTest.web.lists.getByTitle("Test List")();
  testListItem = (
    await spTest.web.lists.getByTitle("Test List").items.top(1)()
  )[0];
});

test("useListItem, get list item", async () => {
  const hook = renderHook(() =>
    useListItem(testListItem.Id, testList.Id, {
      query: {
        select: ["Id", "Title", "Author/Id"],
        expand: ["Author"],
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `List item:${testList.Id}/${testListItem.Id}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListItems, get list items", async () => {
  const hook = renderHook(() =>
    useListItems(testList.Id, {
      query: {
        select: ["Id", "Title", "Author/Id"],
        expand: ["Author"],
        top: 5,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`List item:${testList.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListItem, get all list items", async () => {
  const hook = renderHook(() =>
    useListItems(testList.Id, {
      query: {
        select: ["Id", "Title", "Author/Id"],
        expand: ["Author"],
      },
      mode: useListItemsMode.All,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(hook.result.current?.length).toBe(testList.ItemCount);
    expect(Array.isArray(hook.result.current)).toBe(true);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useListItem, get all list items by paging", async () => {
  let itemCount = 0;
  let done = true;
  /** @type{import("../../../src").NextPageDispatch<any> | undefined} **/
  let next;

  const hook = renderHook(() =>
    useListItems(testList.Id, {
      query: {
        select: ["Id", "Title"],
        top: 1000,
      },
      mode: useListItemsMode.Paged,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    const [items, _next, _hasNext] = hook.result.current;

    expect(items).toBeTypeOf("object");
    expect(items).toBeTruthy();
    expect(Array.isArray(items)).toBe(true);

    next = _next;
    done = _hasNext;
    itemCount += items?.length ?? 0;
  }, DEFAULT_WAITFOR_OPTS);

  while (!done && next) {
    await new Promise((resolve, reject) => {
      next?.((items, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });

    const [, , _done] = hook.result.current;

    if (!_done) {
      await waitFor(() => {
        const [items, _next, _done] = hook.result.current;

        expect(items).toBeTypeOf("object");
        expect(items).toBeTruthy();
        expect(Array.isArray(items)).toBe(true);

        next = _next;
        done = _done;
        itemCount += items?.length ?? 0;
      }, DEFAULT_WAITFOR_OPTS);
    } else {
      done = _done;
    }
  }

  expect(itemCount).toBe(testList.ItemCount);
});
