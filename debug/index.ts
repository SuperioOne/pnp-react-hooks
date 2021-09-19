import { JSDOM } from "jsdom";
import * as ReactDOM from "react-dom";
import * as fs from "fs";
import * as readline from "readline";
import 'colors';

const dom = new JSDOM(`<!DOCTYPE html><div id="react">Hello world</div>`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).window = dom.window;

const debugModes = fs.readdir("/debug", err =>
{
    console.error(err);
    process.exit(-1);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.debug(debugModes);

rl.question('Name? ', (answer) =>
{
    import(answer)
        .then(Component =>
        {
            const element = dom.window.document.getElementById("react");
            ReactDOM.render(Component(), element);
        })
        .catch(console.error);
});
