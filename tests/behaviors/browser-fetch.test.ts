import { HTTP_ERROR_CODES } from "../../src/behaviors/types";
import { HttpRequestError } from "@pnp/queryable";
import { InitGlobalFetch } from "../tools/InitGlobalFetch";
import { Response } from "node-fetch";
import { _browserFetchRetry } from "../../src/behaviors/FetchWithAbort";

const originalFetch = global.fetch;

beforeAll(() =>
{
    InitGlobalFetch();
});

beforeEach(() =>
{
    jest.restoreAllMocks();
});

afterAll(() =>
{
    jest.restoreAllMocks();
    global.fetch = originalFetch;
});

test('browser-fetch retry test with custom retry count', async () =>
{
    const mockFetch = jest.spyOn(global, "fetch");
    const retryCount = 6;

    mockFetch.mockImplementation((): Promise<any> =>
        new Promise((resolve) =>
            resolve(new Response(undefined, { status: 408 })))
    );

    try
    {
        await _browserFetchRetry("/mock-api-call/request-time-out-408", { retry: retryCount });
    }
    catch (err)
    {
        expect((<HttpRequestError>err).response.status).toBe(408);
    }
    expect(mockFetch).toBeCalledTimes(retryCount);
});

test('browser-fetch retry test for all codes', async () =>
{
    const mockFetch = jest.spyOn(global, "fetch");

    for (const code of HTTP_ERROR_CODES)
    {
        mockFetch.mockImplementation((): Promise<any> =>
            new Promise((resolve) =>
                resolve(new Response(undefined, { status: code })))
        );

        try
        {
            await _browserFetchRetry(`/mock-api-call/${code}`);
        }
        catch (err)
        {
            expect((<HttpRequestError>err).response.status).toBe(code);
        }

        expect(mockFetch).toBeCalledTimes(3);
        mockFetch.mockClear();
    }
});

test('browser-fetch network error', async () =>
{
    const mockFetch = jest.spyOn(global, "fetch");

    mockFetch.mockImplementation((): Promise<any> =>
    {
        throw new Error("NetworkError");
    });

    await expect(_browserFetchRetry("/mock-api-call/fetch-network-error")).rejects.toThrowError("NetworkError");
    expect(mockFetch).toBeCalledTimes(1);
});

test('browser-fetch abort signal', async () =>
{
    const controller = new AbortController();
    controller.abort();

    try
    {
        await _browserFetchRetry("https://localhost/mock-api-call/fetch-aborted", { request: { signal: controller.signal } });
    }
    catch (err)
    {
        expect((<Error>err).name).toBe("AbortError");
    }
});