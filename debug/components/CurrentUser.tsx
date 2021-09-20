import * as React from "react";
import { useCurrentUser } from "../../src";

export function Example()
{
    const currentUser = useCurrentUser();
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(currentUser);
        console.debug(counter);

        window.addEventListener("increase", eventHandler, false);

        return () => window.removeEventListener("increase", eventHandler);
    }, [counter, currentUser]);

    return (<div>{counter}</div>);
}