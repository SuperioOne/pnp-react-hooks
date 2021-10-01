import * as React from "react";
import { LoadActionMode, useWebInfo } from "../../src";

export function WebInfoDebug()
{
    const webInfo = useWebInfo({ query: { select: ["*"] }, loadActionOption: LoadActionMode.KeepPrevious });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(webInfo);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, webInfo]);

    return (<div>{counter}</div>);
}