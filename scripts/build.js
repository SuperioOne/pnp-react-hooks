const performance = require('perf_hooks').performance;
const PROCESS_START = performance.now();

const commonjs = require('@rollup/plugin-commonjs');
const del = require('rollup-plugin-delete');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { visualizer } = require('rollup-plugin-visualizer');

const outputOptions = {
    dir: "dist",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src"
};

async function buildProject()
{
    // create a bundle
    const bundle = await rollup.rollup({
        plugins: [
            del({ targets: 'dist/*' }),
            typescript(),
            nodeResolve(),
            commonjs(),
            visualizer(),
        ],
        input: "src/index.ts",
        external: [
            "react",
            /^(?:@pnp\/sp|@pnp\/sp\/.{1,150})$/,
        ]
    });

    await bundle.generate(outputOptions);

    await bundle.write(outputOptions);

    await bundle.close();
}

buildProject()
    .then(() =>
    {
        const PROCESS_TIME = performance.now() - PROCESS_START;

        console.log(`Build Time: ${PROCESS_TIME}ms`);
        console.log("Build Successfully Completed.");

        process.exit(0);
    })
    .catch((err) =>
    {
        console.error(err);
        process.exit(-1);
    })
