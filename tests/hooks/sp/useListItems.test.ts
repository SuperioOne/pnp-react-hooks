import {
  CustomHookMockup,
  CustomHookProps,
} from "../../tools/mockups/CustomHookMockup";
import { IListInfo } from "@pnp/sp/lists";
import { InitGlobalFetch } from "../../tools/InitGlobalFetch";
import { InitPnpTest } from "../../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from "react-dom/test-utils";
import { initJSDOM, ReactDOMElement } from "../../tools/ReactDOMElement";
import { useListItem, useListItems } from "../../../src";
import { ListOptions } from "../../../src/sp/hooks/useListItems";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;
let testList: IListInfo;
let testListItem: { Id: number };

beforeAll(async () => {
  InitGlobalFetch();
  reactDOMElement = initJSDOM();
  spTest = InitPnpTest();

  testList = await spTest.web.lists.getByTitle("Test List")();
  testListItem = (
    await spTest.web.lists.getByTitle("Test List").items.top(1)()
  )[0];
});
afterEach(() => reactDOMElement.unmountComponent());

test("useListItem get list item", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useListItem(testListItem.Id, testList.Id, {
        query: {
          select: ["Id", "Title", "Author/Id"],
          expand: ["Author"],
        },
        sp: spTest,
        error: err,
      }),
  };

  await act(() =>
    expect(
      reactDOMElement.mountTestComponent(
        "useListItem get list item",
        CustomHookMockup,
        props,
      ),
    ).resolves.toBeTruthy(),
  );
});

test("useListItem get list items", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useListItems(testList.Id, {
        query: {
          select: ["Id", "Title", "Author/Id"],
          expand: ["Author"],
        },
        sp: spTest,
        error: err,
      }),
  };

  await act(async () => {
    const items = await reactDOMElement.mountTestComponent(
      "useListItem get list items",
      CustomHookMockup,
      props,
    );
    expect(items?.length).toBeGreaterThan(0);
  });
});

test("useListItem get list items with getAll", async () => {
  const props: CustomHookProps = {
    useHook: (err) =>
      useListItems(testList.Id, {
        query: {
          select: ["Id", "Title", "Author/Id"],
          expand: ["Author"],
        },
        mode: ListOptions.All,
        sp: spTest,
        error: err,
      }),
  };

  await act(async () => {
    const items = await reactDOMElement.mountTestComponent(
      "useListItem get list items with getAll",
      CustomHookMockup,
      props,
    );
    expect(items?.length).toBeGreaterThan(0);
  });
});

test("useListItem get list items with paged", async () => {
  let itemCount = 0;
  const props: CustomHookProps = {
    useHook: (err) =>
      useListItems(testList.Id, {
        query: {
          select: ["Id", "Title", "Author/Id"],
          expand: ["Author"],
          top: Math.ceil(testList.ItemCount / 10),
        },
        mode: ListOptions.Paged,
        keepPreviousState: true,
        sp: spTest,
        error: err,
      }),
    completeWhen: (response: [unknown[], () => void, boolean]) => {
      const [data, next, hasNext] = response;

      itemCount += data?.length ?? 0;

      if (hasNext) {
        next();
        return false;
      } else if (hasNext === false) {
        return true;
      } else {
        return false;
      }
    },
  };

  await act(async () => {
    const [, , hasNext] = await reactDOMElement.mountTestComponent(
      "useListItem get list items with paged",
      CustomHookMockup,
      props,
    );
    expect(itemCount).toBe(testList.ItemCount);
    expect(hasNext).toBe(false);
  });
});
