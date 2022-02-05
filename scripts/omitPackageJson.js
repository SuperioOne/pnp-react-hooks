import args from 'args';
import path from "path";
import fse from "fs-extra";

const CURRENT_PATH = process.cwd();

function normalizePath(pathVal)
{
    if (!path.isAbsolute(pathVal))
    {
        return path.join(CURRENT_PATH, pathVal);
    }
    else
    {
        return pathVal;
    }
}

args
    .option("outDir", "Set output directory", "./package")
    .option("packagejson", "Source package json file", "package.json")

const options = args.parse(process.argv);

const outDir = normalizePath(options.outDir);
const packagejson = normalizePath(options.packagejson);

setTimeout(async () =>
{
    try
    {
        const omitedKeys = [
            "devDependencies",
            "scripts",
            "type",
            "engines"
        ];

        const packageInfo = await fse.readJSON(packagejson);

        for (let i = 0; i < omitedKeys.length; i++)
        {
            const key = omitedKeys[i];
            Reflect.deleteProperty(packageInfo, key);
        }

        await fse.writeJSON(path.join(outDir, "package.json"), packageInfo, { spaces: 4 });
    }
    catch (err)
    {
        console.error(err);
        process.exit(-1);
    }
}, 0);