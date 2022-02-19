import { TestConfig } from "./tests/test.config";

const config: TestConfig = {
    logResponse: true,
    cacheMode: "ifExists",
    cacheDir: "./.temp/requestCache",
    retries: 3,
    retryInterval: 5000
};

export default config;