import * as React from "react";
import { useSearchUser } from "../../src";

export function SearchUserDebug()
{
    const [term, setTerm] = React.useState("*");

    const users = useSearchUser(term);

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        const termUpdate = (event) =>
        {
            setTerm((event as CustomEvent).detail[0]);
        };

        console.debug(users);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);
        window.addEventListener("search", termUpdate, false);

        return () =>
        {
            window.removeEventListener("reload", eventHandler);
            window.removeEventListener("search", termUpdate);
        };
    }, [counter, users]);

    return (<div>{counter}</div>);
}