import * as React from "react";
import { useFolderTree } from "../../src";

export function FolderTreeDebug()
{
    const folderTree = useFolderTree("/bocubom/Shared Documents", { web: "/BOcubom", fileQuery: { select: ["*"] } });
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        console.debug(folderTree);
        console.debug(counter);

        window.addEventListener("render", eventHandler, false);

        return () => window.removeEventListener("render", eventHandler);
    }, [counter, folderTree]);

    return (<div>{counter}</div>);
}