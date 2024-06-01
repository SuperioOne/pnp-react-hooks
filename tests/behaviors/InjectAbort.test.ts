import "@pnp/sp/webs";
import { InitGlobalFetch } from "../tools/InitGlobalFetch";
import { InitPnpTest } from "../tools/InitPnpTest";
import { InjectAbortSignal } from "../../src/behaviors/internals";
import { SPFI } from "@pnp/sp";

let spTest: SPFI;

beforeAll(() => {
  InitGlobalFetch();
  spTest = InitPnpTest();
});

test("Non aborted consecutive call", async () => {
  const abortController = new AbortController();
  const instance = spTest.web.using(InjectAbortSignal(abortController));

  await expect(instance()).resolves.toBeTruthy();
  await expect(instance()).resolves.toBeTruthy();
});

test("Abort only first call", async () => {
  const abortController = new AbortController();
  const instance = spTest.web.using(InjectAbortSignal(abortController));

  abortController.abort();

  try {
    await instance();
  } catch (err) {
    expect((<Error>err).name).toBe("AbortError");
  }

  await expect(instance()).resolves.toBeTruthy();
});

test("Abort all calls", async () => {
  const abortController = new AbortController();
  const instance = spTest.web.using(InjectAbortSignal(abortController));

  for (let index = 0; index < 5; index++) {
    abortController.abort();

    try {
      await instance();
    } catch (err) {
      expect((<Error>err).name).toBe("AbortError");
    }
  }
});
