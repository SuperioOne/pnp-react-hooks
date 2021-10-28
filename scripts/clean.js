import 'colors';
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

setTimeout(async () =>
{
    try
    {
        const deletePaths = [
            ".bin",
            "node_modules",
            "temp",
        ];

        for (let i = 0; i < deletePaths.length; i++)
        {
            const path = normalizePath(deletePaths[i]);
            console.log(`Removing directory : ${path}`.yellow);
            await fse.remove(path);
        }

        console.log("Cleaning Completed.".green);
    }
    catch (err)
    {
        console.error(err);
        process.exit(-1);
    }
}, 0);