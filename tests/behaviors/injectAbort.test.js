import "@pnp/sp/webs";
import { AbortSignalSource } from "../../src";
import { InitPnpTest } from "../common";
import { InjectAbortSignal } from "../../src/behaviors/injectAbortSignal";
import { beforeAll, expect, test } from "vitest";

/** @type {import('@pnp/sp').SPFI} **/
let spTest;

beforeAll(() => {
  spTest = InitPnpTest();
});

test("Non aborted consecutive call", async () => {
  const abortSource = new AbortSignalSource();
  const instance = spTest.web.using(InjectAbortSignal(abortSource));

  await expect(instance()).resolves.toBeTruthy();
  await expect(instance()).resolves.toBeTruthy();
});

test("Abort only first call", async () => {
  const abortSource = new AbortSignalSource();
  const instance = spTest.web.using(InjectAbortSignal(abortSource));

  abortSource.abort();

  try {
    await instance();
  } catch (err) {
    expect(err?.name).toBe("AbortError");
  }

  await expect(instance()).resolves.toBeTruthy();
});

test("Abort all calls", async () => {
  const abortSource = new AbortSignalSource();
  const instance = spTest.web.using(InjectAbortSignal(abortSource));

  for (let index = 0; index < 5; index++) {
    abortSource.abort();

    try {
      await instance();
    } catch (err) {
      expect(err.name).toBe("AbortError");
    }
  }
});
