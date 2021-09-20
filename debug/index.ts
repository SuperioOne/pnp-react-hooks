import 'colors';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as readline from "readline";
import { InitEnvironment } from "./init";

import { Example } from "./components/CurrentUser";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eventLoop = () => 
{
    setTimeout(() => eventLoop(),100);
}

InitEnvironment()
    .then(rootElement =>
    {
        ReactDOM.render(React.createElement(Example), rootElement);

        // eslint-disable-next-line no-constant-condition
        rl.on('line', (input) =>
        {
            window.dispatchEvent(new window.Event(input));
        });

        eventLoop();
    })
    .catch(console.error);