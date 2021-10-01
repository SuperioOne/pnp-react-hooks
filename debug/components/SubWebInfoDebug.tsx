import * as React from "react";
import { LoadActionMode, useSubWebInfos } from "../../src";

export function SubWebInfosDebug()
{
    const webs = useSubWebInfos({ query: { select: ["*"], orderBy: "Title" }, loadActionOption: LoadActionMode.KeepPrevious });

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