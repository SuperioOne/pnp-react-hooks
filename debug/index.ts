import 'colors';
import * as ReactDOM from "react-dom";
import * as readline from "readline";
import { Example } from "./components/Example";
import { InitEnvironment } from "./init";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () =>
{
    const [rootElement] = await InitEnvironment();

    ReactDOM.render(Example(), rootElement);

    // eslint-disable-next-line no-constant-condition
    rl.on('line', (input) =>
    {
        window.dispatchEvent(new Event(input));
    });

})()
    .then(() => console.log("Completed"))
    .catch(err =>
    {
        console.error(err);
        process.exit(-1);
    });