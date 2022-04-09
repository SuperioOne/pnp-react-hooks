import { RenderListDataOptions } from "@pnp/sp/lists";
import * as React from "react";
import { useListAsStream } from "../../src";

const SIZE = 30;

export function ListAsStreamDebug()
{
    const [row, setRow] = React.useState(1);
    const [count, setCount] = React.useState(1);
    const data = useListAsStream("Test List",
        {
            dataParameters: {
                Paging: "TRUE",
                RenderOptions: RenderListDataOptions.ListData
            },
            dataOverrideParameters: {
                PageFirstRow: `${row}`,
                PageLastRow: `${row + SIZE}`
            },
            useQueryParameters: true
        },
        {
            error: console.log,
        }, [count]);

    React.useEffect(() =>
    {
        const eventHandler = () => setRow((prev) => prev + SIZE);
        const blankRender = () => setCount((prev) => prev + 1);

        console.debug("Data : ");
        console.debug(JSON.stringify(data, undefined, 4));

        window.addEventListener("next", eventHandler, false);
        window.addEventListener("render", blankRender, false);

        return () =>
        {
            window.removeEventListener("next", eventHandler);
            window.removeEventListener("render", blankRender);
        };
    }, [data, count]);

    return (<div></div>);
}