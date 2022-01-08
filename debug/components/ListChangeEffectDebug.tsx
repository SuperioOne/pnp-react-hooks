import * as React from "react";
import { useListChangeEffect } from "../../src/hooks/useListChangeEffect";

export function ListChangeEffectDebug()
{
    const [counter, setCounter] = React.useState<number>(0);
    const [interval, setInterval] = React.useState<number>(1000);

    useListChangeEffect("Test List", (token) =>
    {
        console.debug(token);
        console.debug(counter);
    }, { interval: interval }, [counter]);

    React.useEffect(() =>
    {
        const eventHandler = () => setCounter(counter + 1);
        const eventIntervalHandler = (e) => setInterval(Number((e as CustomEvent).detail[0]));

        console.debug(`render count: ${counter}`);

        window.addEventListener("render", eventHandler, false);
        window.addEventListener("interval", eventIntervalHandler, false);

        return () =>
        {
            window.removeEventListener("render", eventHandler);
            window.removeEventListener("interval", eventIntervalHandler);
        };
    }, [counter]);

    return (<div>{counter}</div>);
}