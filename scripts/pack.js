import 'colors';
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
    .option("srcDir", "source directory", ".")
    .option("packagejson", "Source package json file", "package.json")

const options = args.parse(process.argv);

const outDir = normalizePath(options.outDir);
const srcDir = normalizePath(options.srcDir);
const packagejson = normalizePath(options.packagejson);

setTimeout(async () =>
{
    try
    {
        await fse.remove(outDir);
        await fse.mkdirs(outDir);
        await fse.copy(srcDir, outDir, { recursive: true });
        await fse.copyFile(packagejson, outDir);
    }
    catch (err)
    {
        console.error(err);
        process.exit(-1);
    }
}, 0);