/* eslint-disable @typescript-eslint/no-explicit-any */

import * as util from "util";

const BG_COLOR = "\x1b[48;2;144;249;239m";
const FG_COLOR = "\x1b[38;2;144;249;239m";
const RED = "\x1b[31m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

/**
 * Prints Pnp response to stdout with unique color and formatting 
 * @param name test name
 * @param data the arguments are all passed to `util.format()`. 
 * [`See NodeJS util.format`](https://nodejs.org/api/util.html#utilformatformat-args) for more formatting options.
 */
export function formatResponse(name: string, ...data: any[])
{
    // cyan text color
    return `${BOLD}${BG_COLOR}${RED} ${name} ${RESET}\n\n${FG_COLOR}${util.format(...data)}${RESET}`;
}