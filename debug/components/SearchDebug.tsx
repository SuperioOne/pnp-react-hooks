import { ISearchQuery } from "@pnp/sp/search";
import * as React from "react";
import { useSearch } from "../../src";

export function SearchDebug()
{

    const [term, setTerm] = React.useState<ISearchQuery | string>({
        Querytext: "*"
    });

    const [result, setPage] = useSearch(term);

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

        const pageUpdate = (event) =>
        {
            setPage(Number((event as CustomEvent).detail[0]));
        };

        console.debug(`CurrentPage : ${result?.CurrentPage}`);
        console.debug(`RowCount : ${result?.RowCount}`);
        console.debug(`Props : ${result?.RawSearchResults?.Properties}`);
        console.debug(`result is completed : ${typeof result}`);
        console.debug(`reload counter :${counter}`);

        window.addEventListener("reload", eventHandler, false);
        window.addEventListener("search", termUpdate, false);
        window.addEventListener("setpage", pageUpdate, false);

        return () =>
        {
            window.removeEventListener("reload", eventHandler);
            window.removeEventListener("search", termUpdate);
            window.removeEventListener("setpage", pageUpdate);
        };
    }, [counter, result, setPage]);

    return (<div>{counter}</div>);
}