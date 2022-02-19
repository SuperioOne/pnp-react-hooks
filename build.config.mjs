import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
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
                        declaration: true
                    }),
                    commonjs(),
                    nodeResolve()
                ],
                output: {
                    dir: "./.temp/bin/release",
                    preserveModules: true,
                    preserveModulesRoot: "src",
                    sourcemap: false,
                    format: "es"
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