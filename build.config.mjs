import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import del from 'rollup-plugin-delete';

/**
 * @type {import('./scripts/buildOptionType'.BuildOption)}    
 */
const configs = {
    Release: [
        {
            stageName: "ESM build",
            rollupConfig: {
                input: "src/index.ts",
                external: [
                    "jsdom",
                    "tslib",
                    "react",
                    "react-dom",
                    "rxjs",
                    /^@pnp\/.{1,150}$/,
                ],
                plugins: [
                    del({
                        targets: ["./.temp/bin/release/*"]
                    }),
                    typescript({
                        outDir: "./.temp/bin/release",
                        declaration: true,
                    }),
                    commonjs(),
                    nodeResolve(),
                ],
                output: {
                    dir: "./.temp/bin/release",
                    preserveModules: true,
                    preserveModulesRoot: "src",
                    sourcemap: false,
                    format: "es"
                }
            }
        },
        {
            stageName: "CommonJS minified build",
            rollupConfig: {
                input: "src/index.ts",
                external: [
                    "jsdom",
                    "react",
                    "react-dom",
                    /^@pnp\/.{1,150}$/,
                ],
                plugins: [
                    typescript({
                        declaration: false,
                        outDir: "./.temp/bin/release/dist"
                    }),
                    commonjs(),
                    nodeResolve(),
                    terser()
                ],
                output: {
                    sourcemap: false,
                    format: "cjs",
                    file: "./.temp/bin/release/dist/pnp-react-hooks.min.js"
                }
            }
        }
    ],
    Debug: [
        {
            stageName: "ESM Debug",
            rollupConfig: {
                input: "debug/index.ts",
                external: [
                    "jsdom",
                    "tslib",
                    "react",
                    "react-dom",
                    "rxjs",
                    /^@pnp\/.{1,150}$/,
                ],
                plugins: [
                    del({
                        targets: ["./.temp/bin/debug/*"]
                    }),
                    typescript({
                        tsconfig: "tsconfig.debug.json",
                        outDir: "./.temp/bin/debug",
                    }),
                    commonjs(),
                    nodeResolve(),
                ],
                output: {
                    dir: "./.temp/bin/debug",
                    preserveModules: true,
                    preserveModulesRoot: "debug",
                    sourcemap: true,
                    format: "es"
                }
            },
        }],
};

export default configs;