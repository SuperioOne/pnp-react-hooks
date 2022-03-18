import * as React from "react";
import { useListItems } from "../../src";
import { ListOptions } from "../../src/types/options";

export function ListItemsDebug()
{
    const [counter, setCounter] = React.useState<number>(0);
    const listItems = useListItems("Test List", {
        mode: ListOptions.All,
        query: { select: ["ID", "Title"] },
        error: console.log,
    }, [counter]);

    React.useEffect(() =>
    {
        const eventHandler = () => setCounter(counter + 1);

        console.debug(`item count : ${listItems?.length}`);
        console.debug(`render count:${counter}`);

        window.addEventListener("render", eventHandler, false);

        return () => window.removeEventListener("render", eventHandler);
    }, [counter, listItems]);

    return (<div>{counter}</div>);
}