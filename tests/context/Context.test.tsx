import { initJSDOM, TestComponentProps } from "../testUtils/ReactDOMElement";
import { ExceptionMode, LoadActionMode, PnpHookGlobalOptions, PnpReactOptionProvider } from "../../src";
import * as React from "react";
import { GlobalContextMockup } from "../testUtils/mockups/GlobalContextMockup";
import { act } from "react-dom/test-utils";
import { shallowEqual } from "../../src/utils/shallowEqual";

const reactDOMElement = initJSDOM();

afterEach(() => reactDOMElement.unmountComponent());

test("PnpReactOptionProvider one layer provider", async () =>
{
    const globalOptions = {
        web: "localhost",
        disabled: false,
        exception: ExceptionMode.Default,
        loadActionOption: LoadActionMode.KeepPrevious,
        useCache: true
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) =>
    {
        return (
            <PnpReactOptionProvider value={globalOptions}>
                <GlobalContextMockup {...props} />
            </PnpReactOptionProvider>);
    };

    await act(async () =>
    {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider one layer provider", TestComponent);
        expect(shallowEqual(options, globalOptions)).toBe(true);
    });
});

test("PnpReactOptionProvider two layer provider", async () =>
{
    const globalOptionsL2: PnpHookGlobalOptions = {
        web: "localhost2",
        disabled: true,
        exception: ExceptionMode.Suppress,
        loadActionOption: LoadActionMode.ClearPrevious,
        useCache: false
    };

    const globalOptionsL1: PnpHookGlobalOptions = {
        web: "localhost1",
        disabled: "auto",
        exception: ExceptionMode.Default,
        loadActionOption: LoadActionMode.KeepPrevious,
        useCache: true
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) =>
    {
        return (
            <PnpReactOptionProvider value={globalOptionsL1}>
                <PnpReactOptionProvider value={globalOptionsL2}>
                    <GlobalContextMockup {...props} />
                </PnpReactOptionProvider>
            </PnpReactOptionProvider>);
    };

    await act(async () =>
    {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider two layer provider", TestComponent);
        expect(shallowEqual(options, globalOptionsL2)).toBe(true);
    });
});

test("PnpReactOptionProvider provider value change", async () =>
{
    const globalOptionsInit = {
        web: "localhost2",
        disabled: true,
        exception: ExceptionMode.Suppress,
        loadActionOption: LoadActionMode.ClearPrevious,
        useCache: false
    };

    const globalOptionsNext = {
        web: "localhost",
        disabled: false,
        exception: console.error,
        loadActionOption: LoadActionMode.KeepPrevious,
        useCache: true
    };


    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) =>
    {
        const [context, setContext] = React.useState<PnpHookGlobalOptions>(globalOptionsInit);

        React.useEffect(() =>
        {
            const timer = setTimeout(() => setContext(globalOptionsNext), 500);
            return () => clearTimeout(timer);
        }, []);

        return (
            <PnpReactOptionProvider value={context}>
                <GlobalContextMockup {...{ ...props, success: context === globalOptionsNext ? props.success : () => { return; } }} />
            </PnpReactOptionProvider>);
    };

    await act(async () =>
    {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider provider value change", TestComponent);
        expect(shallowEqual(options, globalOptionsNext)).toBe(true);
    });
});