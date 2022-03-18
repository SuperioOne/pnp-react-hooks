import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

const DIR_RELEASE = "./.temp/bin/release";
const DIR_DEBUG = "./.temp/bin/debug";

/**
 * @type {import('./scripts/buildOptionType'.BuildOption)}
 */
const configs = {
    Release: [
        {
            stageName: "ESM build",
            rollupConfig: {
                input: ["src/index.ts", "src/behaviors/index.ts"],
                external: [
                    /node_modules/,
                ],
                plugins: [
                    del({
                        targets: [`${DIR_RELEASE}/*`]
                    }),
                    typescript({
                        outDir: DIR_RELEASE,
                        declaration: true
                    }),
                    commonjs(),
                    nodeResolve(),
                    copy({
                        targets: [
                            { src: "README.md", dest: DIR_RELEASE },
                            { src: "LICENSE", dest: DIR_RELEASE },
                        ]
                    })
                ],
                output: {
                    dir: DIR_RELEASE,
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
                    /node_modules/,
                ],
                plugins: [
                    del({
                        targets: [`${DIR_DEBUG}/*`]
                    }),
                    typescript({
                        tsconfig: "tsconfig.debug.json",
                        outDir: DIR_DEBUG,
                    }),
                    commonjs(),
                    nodeResolve(),
                ],
                output: {
                    dir: DIR_DEBUG,
                    preserveModules: true,
                    preserveModulesRoot: "debug",
                    sourcemap: true,
                    format: "es"
                }
            },
        }],
};

export default configs;