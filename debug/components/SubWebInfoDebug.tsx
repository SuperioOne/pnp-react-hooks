import * as React from "react";
import { useSubWebs } from "../../src";

export function SubWebInfosDebug()
{
    const webs = useSubWebs({ query: { select: ["*"], orderBy: "Title" }, keepPreviousState: true });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(webs);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, webs]);

    return (<div>{counter}</div>);
}