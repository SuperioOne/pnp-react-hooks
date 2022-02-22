import * as React from "react";
import { useFile } from "../../src";

export function FileDebug()
{
    const [fileId, setFileId] = React.useState<string>();

    const fileData = useFile(fileId, {
        disabled: "auto",
        error: console.error,
        keepPreviousState: true,
        type: "text"
    });
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const fileEventHandler = ((e: CustomEvent<string[]>) => setFileId(e.detail[0])) as EventListener;
        const renderEventHandler = () => setCounter(e => e + 1);

        console.debug(fileData);
        console.debug(counter);

        window.addEventListener("render", renderEventHandler, false);
        window.addEventListener("fileId", fileEventHandler, false);

        return () =>
        {
            window.removeEventListener("render", renderEventHandler);
            window.removeEventListener("fileId", fileEventHandler);
        };
    }, [counter, fileData]);

    return (<div>{counter}</div>);
}