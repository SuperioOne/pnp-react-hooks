import 'colors';
import * as rollup from 'rollup';
import args from 'args';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { performance } from 'perf_hooks';

const PROCESS_START = performance.now();

args
    .option("outDir", "Set output directory", ".")
    .option("format", "Build output type (amd, cjs, es, iife, umd, system)", "es")
    .option("quiet", "Do not show output", false)
    .option("sourceMap", "Generate source maps", false)
    .option("build", "Start building")
    .option("includeDirs", "tsc build include")
    .option("dry-run", "start building without emitting output files.", false);


const options = args.parse(process.argv);

let include = undefined;
if (options?.includeDirs)
{
    include = options?.includeDirs.replace(/(?:\[|\]|\s|"|'|`)/g, "").split(",");
}

if (options.dryRun)
{
    options.sourceMap = false;
    options.outDir = undefined;

    console.log("Dry-run started".yellow);
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
    let bundle;

    try
    {
        const plugins = [
            typescript({
                outDir: options.outDir,
                sourceMap: options.sourceMap,
                noEmitOnError: true,
                include: include,
                mapRoot: options.sourceMap ? "." : undefined
            }),
            commonjs(),
            nodeResolve(),
        ];

        if (!options.dryRun)
        {
            plugins.unshift(del({ targets: `${options.outDir}/*` }));
        }

        bundle = await rollup.rollup({
            plugins: plugins,
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

        if (!options.dryRun)
        {
            await bundle.generate(outputOptions);
            await bundle.write(outputOptions);
        }

        await bundle.close();
    }
    catch (err)
    {
        throw err;
    }
    finally
    {
        bundle?.close();
    }
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
    });