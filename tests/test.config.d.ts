export type CacheMode = "ifExists" | "cacheOnly" | "disabled";

export interface TestConfig
{
    logResponse?: boolean;
    cacheMode?: CacheMode;
    cacheDir: string;
    retries?: number;
    retryInterval?: number;
}