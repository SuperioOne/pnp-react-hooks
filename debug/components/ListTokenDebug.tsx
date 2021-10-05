import * as React from "react";
import { useListChangeToken } from "../../src";

export function ListTokenDebug()
{
    const token = useListChangeToken("Test List");
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () => setCounter(counter + 1);

        console.debug(`render count: ${counter}`);
        console.debug(token);

        window.addEventListener("render", eventHandler, false);

        return () => window.removeEventListener("render", eventHandler);
    }, [counter, token]);

    return (<div>{counter}</div>);
}