import { SPFI } from "@pnp/sp";
import * as React from "react";
import { PnpHookGlobalOptions, PnpHookOptionProvider } from "../src";
import * as Components from "./components";
import { MOUNT_EVENT } from "./constants";

interface TestComponent
{
    Component: () => JSX.Element | undefined;
}

export interface DebugAppProps
{
    sp: SPFI;
}

export function DebugApp(props: DebugAppProps)
{
    const [Current, setCurrent] = React.useState<TestComponent>({
        Component: undefined
    });

    const options: PnpHookGlobalOptions = React.useMemo(() =>
    ({
        ...props,
        error: console.error
    }), [props]);

    React.useEffect(() =>
    {
        const eventHandler = ((evt: CustomEvent<string>) =>
        {
            const newComponent = Components[evt.detail];
            setCurrent({
                Component: newComponent
            });

            console.log(`${evt.detail} mounted.`);
        }) as EventListener;

        window.addEventListener(MOUNT_EVENT, eventHandler, false);

        return () => window.removeEventListener(MOUNT_EVENT, eventHandler);
    }, []);

    if (Current.Component)
    {
        return (
            <PnpHookOptionProvider value={props}>
                <Current.Component />
            </PnpHookOptionProvider>
        );
    }
    else
    {
        return (<div></div>);
    }
}