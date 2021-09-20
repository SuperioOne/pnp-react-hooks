import 'colors';
import * as rollup from 'rollup';
import args from 'args';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { performance } from 'perf_hooks';
import { visualizer } from 'rollup-plugin-visualizer';

const PROCESS_START = performance.now();

args
    .option("outDir", "Set output directory", ".")
    .option("format", "Build output type (amd, cjs, es, iife, umd, system)", "es")
    .option("quiet", "Do not show output", false)
    .option("sourceMap", "Generate source maps", false)
    .option("build", "Start building");

const options = args.parse(process.argv);


if (options.help)
{
    args.showHelp();
    exit(1);
}

const root = options.build.split("/").find(e => e !== "");

const outputOptions = {
    dir: options.outDir,
    format: options.format,
    preserveModules: true,
    preserveModulesRoot: root,
    sourcemap: options.sourceMap
};

function writeRollupError(err)
{
    console.error(err.message.red);

    if (typeof err.loc === "object" && err.loc.file)
    {
        console.error(`at ${err.loc.file}${err.loc.line > -1 ? `:${err.loc.line}` : ""}${err.loc.column > -1 ? `:${err.loc.column}` : ""}`.yellow.italic);
    }
}

async function buildProject()
{
    // create a bundle
    const bundle = await rollup.rollup({
        plugins: [
            del({ targets: `${options.outDir}/*` }),
            typescript({
                outDir: options.outDir,
                sourceMap: options.sourceMap,
                noEmitOnError: true,
                include: [`${root}/**/*`],
                mapRoot: "."
            }),
            commonjs(),
            nodeResolve(),
            visualizer(),
        ],
        input: options.build,
        external: [
            "jsdom",
            "colors",
            "tslib",
            "react",
            "react-dom",
            "rxjs",
            /^@pnp\/.{1,150}$/,
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

        if (!options.q)
        {
            console.log(`Build Duration: ${PROCESS_TIME.toFixed(2)}ms`.yellow);
            console.log("Build Successfully Completed.".green);
        }

        process.exit(0);
    })
    .catch((err) =>
    {
        if (!options.q)
        {
            writeRollupError(err);
        }

        process.exit(-1);
    })
