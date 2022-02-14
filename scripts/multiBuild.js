import * as rollup from 'rollup';
import args from 'args';
import configs from "../build.config.mjs";
import { performance } from 'perf_hooks';
import { visualizer } from 'rollup-plugin-visualizer';

function writeRollupError(err)
{
    console.error(err.message);

    if (typeof err.loc === "object" && err.loc.file)
    {
        console.error(`at ${err.loc.file}${err.loc.line > -1 ? `:${err.loc.line}` : ""}${err.loc.column > -1 ? `:${err.loc.column}` : ""}`);
    }
}

async function buildStage(conf, dryRun)
{
    let bundle;

    try
    {
        bundle = await rollup.rollup(conf);

        if (!dryRun)
        {
            await bundle.generate(conf.output);
            await bundle.write(conf.output);
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

async function startBuild(opt)
{
    const currentConfig = configs[opt.config];

    if (!Array.isArray(currentConfig))
    {
        console.error(`Unable to found configuration '${opt.config}'`);
    }

    if (opt.dryRun)
    {
        console.log("Dry-run started");
    }

    if (opt.visualize)
    {
        currentConfig.forEach(cfg =>
        {
            const outName = `./.temp/stats_${opt.config}_${cfg.stageName.replace(/[?\\\/:"|*<>()+=~#!@\'\:\;%\^\&\{\}\[\]\s]+/g, "_")}.html`.toLowerCase();

            if (cfg.rollupConfig.plugins)
            {
                cfg.rollupConfig.plugins.push(visualizer({
                    filename: outName
                }));
            }
            else
            {
                cfg.rollupConfig.plugins = [visualizer({
                    filename: outName
                })];
            }

            if (!opt.q) console.log(`Visualize graph will be created at ${outName}`);
        });
    }

    for (let index = 0; index < currentConfig.length; index++)
    {
        const cfg = currentConfig[index];

        if (!opt.q) console.log(`Stage Started : ${cfg.stageName}`);

        await buildStage(cfg.rollupConfig, opt.dryRun);

        if (!opt.q) console.log(`Stage Completed : ${cfg.stageName}\n`);
    }
}

args
    .option("quiet", "Do not show output", false)
    .option("dry-run", "start building without emitting output files.", false)
    .option("visualize", "create a visualization graph file for generated code.", false)
    .option("config", "configuration", "Release");

const PROCESS_START = performance.now();
const options = args.parse(process.argv);

startBuild(options)
    .then(() =>
    {
        const PROCESS_TIME = performance.now() - PROCESS_START;

        if (!options.q)
        {
            console.log(`Build Duration: ${PROCESS_TIME.toFixed(2)}ms`);
            console.log("Build Successfully Completed.");
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