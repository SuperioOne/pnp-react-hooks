import "@pnp/sp/webs";
import { InitGlobalFetch } from "../tools/InitGlobalFetch";
import { InitPnpTest } from "../tools/InitPnpTest";
import { InjectAbort, ManagedAbort } from "../../src/behaviors/InjectAbort";
import { SPFI } from "@pnp/sp";

let spTest: SPFI;

beforeAll(() =>
{
    InitGlobalFetch();
    spTest = InitPnpTest();
});

test('Non aborted consecutive call', async () =>
{
    const abortController = new ManagedAbort();
    const instance = spTest.web.using(InjectAbort(abortController));

    await expect(instance()).resolves.toBeTruthy();
    await expect(instance()).resolves.toBeTruthy();
});

test('Abort only first call', async () =>
{
    const abortController = new ManagedAbort();
    const instance = spTest.web.using(InjectAbort(abortController));

    abortController.abort();

    try
    {
        await instance();
    }
    catch (err)
    {
        expect((<Error>err).name).toBe("AbortError");
    }

    await expect(instance()).resolves.toBeTruthy();
});

test('Abort all calls', async () =>
{
    const abortController = new ManagedAbort();
    const instance = spTest.web.using(InjectAbort(abortController));

    for (let index = 0; index < 5; index++)
    {
        abortController.abort();

        try
        {
            await instance();
        }
        catch (err)
        {
            expect((<Error>err).name).toBe("AbortError");
        }
    }
});
