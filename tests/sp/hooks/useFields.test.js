import { useField, useFields } from "../../../src";
import { DEFAULT_WAITFOR_OPTS, InitPnpTest, logResponse } from "../../common";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, expect, test } from "vitest";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
/** @type{import("@pnp/sp/lists").IListInfo} **/
let listInfo;
/** @type{import("@pnp/sp/fields").IFieldInfo} **/
let listFieldInfo;
/** @type{import("@pnp/sp/fields").IFieldInfo} **/
let webFieldInfo;

beforeAll(async () => {
  spTest = InitPnpTest();

  const listInfos = await spTest.web.lists.top(1)();

  if (listInfos?.length < 1) throw new Error("Unable to find list");

  listInfo = listInfos[0];

  const [listFields, webFields] = await Promise.all([
    spTest.web.lists.getById(listInfo.Id).fields.top(1)(),
    spTest.web.fields.top(1)(),
  ]);

  if (listFields?.length < 1 || webFields?.length < 1)
    throw new Error("Field info is empty");

  listFieldInfo = listFields[0];
  webFieldInfo = webFields[0];
});

afterEach(cleanup);

test("useFields, get web fields", async () => {
  const hook = renderHook(() =>
    useFields({
      query: {
        top: 2,
      },
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse("Web fields", hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useFields, get list fields", async () => {
  const hook = renderHook(() =>
    useFields({
      query: {
        top: 2,
      },
      list: listInfo.Id,
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(true);

    logResponse(`List fields:${listInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useField, get web field by Id", async () => {
  const hook = renderHook(() =>
    useField(webFieldInfo.Id, {
      sp: spTest,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(`Web field:${webFieldInfo.Id}`, hook.result.current);
  }, DEFAULT_WAITFOR_OPTS);
});

test("useField, get list field by internal name", async () => {
  const hook = renderHook(() =>
    useField(listFieldInfo.InternalName, {
      sp: spTest,
      list: listInfo.Id,
    }),
  );

  await waitFor(() => {
    expect(hook.result.current).toBeTypeOf("object");
    expect(hook.result.current).toBeTruthy();
    expect(Array.isArray(hook.result.current)).toBe(false);

    logResponse(
      `List field:${listInfo.Title}/${listFieldInfo.InternalName}`,
      hook.result.current,
    );
  }, DEFAULT_WAITFOR_OPTS);
});

