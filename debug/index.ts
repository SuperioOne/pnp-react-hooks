import 'colors';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as readline from "readline";
import { InitEnvironment } from "./init";

import * as Components from "./components";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eventLoop = () => 
{
    setTimeout(() => eventLoop(), 100);
}

InitEnvironment()
    .then(rootElement =>
    {

        if (!rootElement)
        {
            throw new Error("Initialization failed. Root object is not valid.");
        }

        // eslint-disable-next-line no-constant-condition
        rl.on('line', (input) =>
        {
            if (input.toUpperCase() === "/EXIT")
            {
                process.exit(0);
            }
            else if (input.toUpperCase() === "/HELP")
            {
                console.log("/EXIT \t\t- Exit from debugging.")
                console.log("/HELP \t\t- Show help menu.")
                console.log("/LIST \t\t- List mountable components")
                console.log("/MNT [Name]  \t\t- Mount component. Automatically unmounts if a component is already mounted")
                console.log("/UMNT \t\t- Unmount currently loaded component.")
                console.log("/EVENT \t\t- Trigger a global event.")
            }
            else if (input.toUpperCase() === "/LIST")
            {
                const components = Reflect.ownKeys(Components);

                components.forEach(e => console.log(e.toString().yellow))
            }
            else if (input.toUpperCase().startsWith("/MNT"))
            {
                const options = input.split(" ");

                if (options.length === 2 && Reflect.has(Components, options[1]))
                {
                    ReactDOM.unmountComponentAtNode(rootElement);
                    ReactDOM.render(React.createElement(Components[options[1]]), rootElement);
                    console.log(`Mounted ${options[1]} to the root. You can dispatch events with /EVENT <eventName> .`.green);
                }
                else
                {
                    console.log("Unexpected event input.".yellow);
                }
            }
            else if (input.toUpperCase().startsWith("/UMNT"))
            {
                const unmount = ReactDOM.unmountComponentAtNode(rootElement);
                console.log(unmount ? "Component unmounted".green : "There is no component to unmount".yellow);
            }
            else if (input.toUpperCase() === "/EVENT")
            {
                const options = input.split(" ");

                if (options.length === 2)
                {
                    window.dispatchEvent(new window.Event(input));
                }
                else
                {
                    console.log("Unexpected event input.".yellow);
                }
            }
        });

        eventLoop();
    })
    .catch((err: Error) => console.error(err.name.red, err.message.red, err.stack?.red));