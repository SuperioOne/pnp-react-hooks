import * as React from "react";
import { useFolderTree } from "../../src";

export function FolderTreeDebug()
{
    const [counter, setCounter] = React.useState<number>(0);
    const [root, setRoot] = React.useState<string>();
    const folderTree = useFolderTree(root as any, { disabled: "auto", fileQuery: { select: ["*"] } });

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        const eventRootChange = (e) =>
        {
            setRoot((e as CustomEvent).detail[0]);
        };

        console.debug(folderTree);
        console.debug(counter);
        console.debug(root);

        window.addEventListener("render", eventHandler, false);
        window.addEventListener("root", eventRootChange, false);

        return () =>
        {
            window.removeEventListener("render", eventHandler);
            window.removeEventListener("root", eventRootChange);
        };
    }, [counter, folderTree, root]);

    return (<div>{counter}</div>);
}