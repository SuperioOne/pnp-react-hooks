import * as React from "react";
import { useWebProperties } from "../../src";

export function WebPropertiesDebug()
{
    const properties = useWebProperties({ query: { select: ["FollowLinkEnabled"] }, keepPreviousState: true });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(properties);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, properties]);

    return (<div>{counter}</div>);
}