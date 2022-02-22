import * as Components from "./components";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as readline from "readline";
import { DebugApp } from "./DebugApp";
import { InitEnvironment } from "./init";
import { helpText, MOUNT_EVENT } from "./constants";

const rl = readline.createInterface({
    input: process.stdin,
});

const eventLoop = () => 
{
    setTimeout(() => eventLoop(), 500);
};

// TODO: Its the lowest priority but a better cli code with similar functionality would be nice.
InitEnvironment()
    .then(config =>
    {
        if (config.root === null)
        {
            throw Error("JSDOM root is not loaded.");
        }

        ReactDOM.render(React.createElement(DebugApp, { sp: config.sp }), config.root);

        console.log("Debugger started. see /help for options.");

        rl.on('line', (rawInput) =>
        {
            const input = rawInput.trim();

            if (input.toUpperCase() === "/EXIT")
            {
                console.log("Debugger closing...");
                ReactDOM.unmountComponentAtNode(config.root);
                process.exit(0);
            }
            else if (input.toUpperCase() === "/HELP")
            {
                console.log(helpText);
            }
            else if (input.toUpperCase() === "/LIST")
            {
                const components = Object.keys(Components);

                components.forEach(e => console.log(` * ${e.toString()}`));
            }
            else if (input.toUpperCase().startsWith("/MOUNT"))
            {
                const options = input.trim().split(" ");

                if (options.length === 2 && Reflect.has(Components, options[1]))
                {
                    window.dispatchEvent(new window.CustomEvent(MOUNT_EVENT, { detail: options[1] }));
                }
                else
                {
                    console.log("Unexpected event input.");
                }
            }
            else if (input.toUpperCase().startsWith("/EVENT"))
            {
                const options = input.trim().split(" ");

                if (options.length > 1)
                {
                    window.dispatchEvent(new window.CustomEvent(options[1], { detail: [...(options).slice(2)] }));
                }
                else
                {
                    console.log("Unexpected event input.");
                }
            }
            else
            {
                console.log("Unknown command. See /help for more details.");
            }
        });

        eventLoop();
    })
    .catch((err: Error) => console.error(err.name, err.message, err.stack));