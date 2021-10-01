import * as React from "react";
import { useChanges } from "../../src";

export function ChangesDebug()
{
    const [useList, setUseList] = React.useState(false);

    const apps = useChanges({
        Add: true,
        ChangeTokenEnd: undefined,
        ChangeTokenStart: undefined,
        DeleteObject: true,
        Update: true,
        Item: true,
    },
        {
            list: useList ? "Test List" : undefined
        });

    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() =>
    {
        const eventHandler = () =>
        {
            setCounter(counter + 1);
        };

        const eventSetListHandler = (e) =>
        {
            setUseList(Boolean((e as CustomEvent).detail[0]));
        };

        console.debug(apps);
        console.debug(counter);

        window.addEventListener("reload", eventHandler, false);
        window.addEventListener("setList", eventSetListHandler, false);

        return () =>
        {
            window.removeEventListener("setList", eventSetListHandler);
        };
    }, [counter, apps]);

    return (<div>{counter}</div>);
}