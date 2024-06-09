import * as React from "react";
import { InitPnpTest } from "../common";
import { afterEach, beforeAll, expect, test } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react"
import { PnpHookOptionProvider, createProviderElement, usePnpHookOptions } from "../../src/context";
import { ErrorMode } from "../../src";

/** @type{import('@pnp/sp').SPFI} **/
let spTest;
beforeAll(() => {
    spTest = InitPnpTest();
});

afterEach(cleanup);

test("usePnpHookOptions hook", async () => {
    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const globalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    /** @type{import("react").FunctionComponent} **/
    const TargetComponent = () => {
        const options = usePnpHookOptions();
        return (<p role="info">{options === globalOptions ? "same ref" : "failed"}</p>);
    }

    const dom = render(<PnpHookOptionProvider value={globalOptions}>
        <TargetComponent />
    </PnpHookOptionProvider>);

    const result = dom.getByRole("info")?.textContent;
    expect(result).toBe("same ref");
});


test("PnpReactOptionProvider, one layer", () => {
    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const globalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    /** @type{import("react").FunctionComponent} **/
    const TargetComponent = () => {
        const options = usePnpHookOptions();
        return (<p role="info">{options === globalOptions ? "same ref" : "failed"}</p>);
    }

    const dom = render(<PnpHookOptionProvider value={globalOptions}>
        <TargetComponent />
    </PnpHookOptionProvider>);

    const result = dom.getByRole("info")?.textContent;
    expect(result).toBe("same ref");

});

test("PnpReactOptionProvider, two layer", () => {
    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const globalOptionsL2 = {
        disabled: true,
        error: ErrorMode.Suppress,
        sp: spTest,
    };

    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const globalOptionsL1 = {
        disabled: "auto",
        error: ErrorMode.Suppress,
        keepPreviousState: true,
        sp: spTest,
    };

    /** @type{import("react").FunctionComponent} **/
    const TargetComponent = () => {
        const options = usePnpHookOptions();
        return (<p role="info">{options === globalOptionsL2 ? "Layer 2 ref" : "failed"}</p>);
    }

    const dom = render(
        <PnpHookOptionProvider value={globalOptionsL1}>
            <PnpHookOptionProvider value={globalOptionsL2}>
                <TargetComponent />
            </PnpHookOptionProvider>
        </PnpHookOptionProvider>);

    const result = dom.getByRole("info")?.textContent;
    expect(result).toBe("Layer 2 ref");
});

test("PnpReactOptionProvider by createProviderElement()", async () => {
    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const globalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    /** @type{import("react").FunctionComponent} **/
    const TargetComponent = () => {
        const options = usePnpHookOptions();
        return (<p role="info">{options === globalOptions ? "same ref" : "failed"}</p>);
    }

    const root = createProviderElement(globalOptions, [(<TargetComponent key="example" />)]);
    const dom = render(root);
    const result = dom.getByRole("info")?.textContent;
    expect(result).toBe("same ref");
});

test("PnpReactOptionProvider value change", async () => {
    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const firstOptions = {
        disabled: true,
        error: ErrorMode.Suppress,
        keepPreviousState: true,
        sp: spTest,
    };

    /** @type{import("../../src/types").PnpHookGlobalOptions} **/
    const secondOptions = {
        disabled: false,
        error: console.error,
        keepPreviousState: false,
        sp: spTest,
    };

    /** @type{import("react").FunctionComponent} **/
    const TargetComponent = () => {
        const options = usePnpHookOptions();
        return (
            <p role="info">{
                options === firstOptions
                    ? "First Ref"
                    : options === secondOptions
                        ? "Second Ref"
                        : "failed"
            }
            </p>);
    }

    const RootComponent = () => {
        const [context, setContext] = React.useState(firstOptions);
        const updateCallback = React.useCallback(() => setContext(secondOptions), []);

        return (
            <PnpHookOptionProvider value={context}>
                <button role="trigger" onClick={updateCallback}>Trigger</button>
                <TargetComponent />
            </PnpHookOptionProvider>);
    };

    const dom = render(<RootComponent />);
    const result = dom.getByRole("info")?.textContent;
    expect(result).toBe("First Ref");

    fireEvent(dom.getByRole("trigger"), new MouseEvent("click", { bubbles: true, cancelable: true }));
    await dom.findByText("Second Ref", undefined, { timeout: 3000 });
});
