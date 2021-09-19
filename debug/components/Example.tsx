import * as React from "react";

export function Example()
{
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        window.addEventListener("increase", eventHandler, false);

        return () => window.removeEventListener("increase", eventHandler);
    }, [counter]);

    return (<div>{counter}</div>);
}