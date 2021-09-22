import * as React from "react";
import { useRoleAssignments } from "../../src";

export function RoleAssignmentDebug()
{
    const roles = useRoleAssignments({ query: { select: ["*"] } });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(roles);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);

        return () => window.removeEventListener("reload", eventHandler);
    }, [counter, roles]);

    return (<div>{counter}</div>);
}