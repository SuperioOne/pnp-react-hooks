import * as React from "react";
import { useListItems } from "../../src";
import { ListOptions } from "../../src/types/options";

export function ListItemsPagedDebug()
{
    const [items, next, hasNext] = useListItems("Test List", {
        mode: ListOptions.Paged,
        query: {
            select: ["ID", "Title"],
            top: 5
        },
        error: console.log,
    });

    React.useEffect(() =>
    {
        const eventHandler = () => next();

        console.debug(`Item count : ${items?.length}`);
        console.debug(`Has next : ${hasNext}`);
        console.debug("items : ");
        console.debug(JSON.stringify(items, undefined, 4));

        window.addEventListener("next", eventHandler, false);

        return () => window.removeEventListener("next", eventHandler);
    }, [hasNext, items, next]);

    return (<div></div>);
}