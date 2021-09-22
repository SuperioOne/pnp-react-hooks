import * as React from "react";
import { useRoleDefinitions } from "../../src";

export function RoleDefinitionsDebug()
{
    const definitions = useRoleDefinitions({ query: { select: ["*"] } });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(definitions);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, definitions]);

    return (<div>{counter}</div>);
}