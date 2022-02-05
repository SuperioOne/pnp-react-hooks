import * as Components from "./components";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as readline from "readline";
import { InitEnvironment } from "./init";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eventLoop = () => 
{
    setTimeout(() => eventLoop(), 500);
};

// TODO: Its the lowest priority but a better cli code with similar functionality would be nice.
InitEnvironment()
    .then(rootElement =>
    {
        if (!rootElement)
        {
            throw new Error("Initialization failed. Root object is not valid.");
        }

        console.log("Debugger started. see /help for options.");

        rl.on('line', (rawInput) =>
        {
            const input = rawInput.trim();

            if (input.toUpperCase() === "/EXIT")
            {
                console.log("Debugger closing...");
                process.exit(0);
            }
            else if (input.toUpperCase() === "/HELP")
            {
                console.log("");
                console.log("/EXIT".padEnd(20, " "), "- Exit from debugging.");
                console.log("/HELP".padEnd(20, " "), "- Show help menu.");
                console.log("/LIST".padEnd(20, " "), "- List mountable components");
                console.log("/MOUNT [Name]".padEnd(20, " "), "- Mount component. Automatically unmounts if a component is already mounted.");
                console.log("/UMOUNT".padEnd(20, " "), "- Unmount currently loaded component.");
                console.log("/EVENT".padEnd(20, " "), "- Trigger a global event.");
                console.log("");
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
                    ReactDOM.unmountComponentAtNode(rootElement);
                    ReactDOM.render(React.createElement(Components[options[1]]), rootElement);

                    console.log(`Mounted ${options[1]} to the root. You can dispatch events with /EVENT <eventName> .`);
                }
                else
                {
                    console.log("Unexpected event input.");
                }
            }
            else if (input.toUpperCase().startsWith("/UMOUNT"))
            {
                const unmount = ReactDOM.unmountComponentAtNode(rootElement);
                console.log(unmount ? "Component unmounted" : "There is no component to unmount");
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