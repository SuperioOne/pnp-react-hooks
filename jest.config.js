export default {
    roots: [
        "./tests/",
        "./src/"
    ],
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!<rootDir>/node_modules/"
    ],
    coverageDirectory: "./temp/coverage"
};