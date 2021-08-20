const del = require('rollup-plugin-delete');
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { visualizer } = require('rollup-plugin-visualizer');

const outputOptions = {
    dir: "dist",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src"
};

async function build()
{
    // create a bundle
    const bundle = await rollup.rollup({
        plugins: [
            del({ targets: 'dist/*' }),
            typescript(),
            visualizer(),
        ],
        input: "src/index.ts",
        external: ["react"]
    });

    await bundle.generate(outputOptions);

    await bundle.write(outputOptions);

    await bundle.close();
}

build();