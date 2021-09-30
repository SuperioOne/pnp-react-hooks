import * as React from "react";
import { useListItemsPaged } from "../../src";

export function ListItemsPagedDebug()
{
    const [getOnlyPage, setOnlyPage] = React.useState(false);

    const [listItems, dispatch, hasNext] = useListItemsPaged("Test List", {
        query: {
            select: ["ID", "Title", "Author/Title"],
            expand: ["Author"]
        },
        exception: console.log,
        pageSize: 200,
        returnOnlyPageResult: getOnlyPage
    });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () => setCounter(counter + 1);
        const eventPageModeHandler = (e => setOnlyPage(Boolean((e as CustomEvent).detail[0])));
        const eventDispatchNext = () => dispatch(() => console.log("Page fetch completed."));

        console.debug(`has next: ${hasNext}`);
        console.debug(`item count : ${listItems?.length}`);

        window.addEventListener("render", eventHandler, false);
        window.addEventListener("setPageOnlyMode", eventPageModeHandler, false);
        window.addEventListener("dispatchNext", eventDispatchNext, false);

        return () =>
        {
            window.removeEventListener("render", eventHandler);
            window.removeEventListener("setPageOnlyMode", eventPageModeHandler);
            window.removeEventListener("dispatchNext", eventDispatchNext);
        };
    }, [counter, dispatch, hasNext, listItems]);

    return (<div>{counter}</div>);
}