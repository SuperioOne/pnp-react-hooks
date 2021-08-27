// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFetchOptions } from "@pnp/common";

declare module "@pnp/common"
{
    interface IFetchOptions
    {
        signal?: AbortSignal;
    }
}

export {};