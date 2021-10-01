import * as React from "react";
import { useApps } from "../../src";

export function AppsDebug()
{
    const apps = useApps({ query: { select: ["*"] } });
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(apps);
        console.debug(counter);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, apps]);

    return (<div>{counter}</div>);
}