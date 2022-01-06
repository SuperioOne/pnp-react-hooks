module.exports = {
    roots: [
        "./tests/",
        "./src/"
    ],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!<rootDir>/node_modules/"
    ],
    coverageDirectory: "./.temp/coverage",
    preset: 'ts-jest/presets/js-with-babel',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    },
    testEnvironment: 'node',
    transformIgnorePatterns: ["node_modules/?(!(@pnp|tslib)/)"],
    testTimeout: 30000,
    cacheDirectory:"./.temp/jest_rs"
};