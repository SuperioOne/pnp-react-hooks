import * as React from "react";
import { createProviderElement, ErrorMode, PnpHookGlobalOptions, PnpHookOptionProvider, usePnpHookOptions } from "../../src";
import { GlobalContextMockup } from "../tools/mockups/GlobalContextMockup";
import { InitPnpTest } from "../tools/InitPnpTest";
import { SPFI } from "@pnp/sp";
import { act } from "react-dom/test-utils";
import { initJSDOM, ReactDOMElement, TestComponentProps } from "../tools/ReactDOMElement";
import { shallowEqual } from "../../src/utils/compare";
import { InitGlobalFetch } from "../tools/InitGlobalFetch";

let reactDOMElement: ReactDOMElement;
let spTest: SPFI;

beforeAll(() => {
    InitGlobalFetch();
    reactDOMElement = initJSDOM();
    spTest = InitPnpTest();
});

afterEach(() => reactDOMElement.unmountComponent());

test("PnpReactOptionProvider one layer provider", async () => {
    const globalOptions: PnpHookGlobalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) => {
        return (
            <PnpHookOptionProvider value={globalOptions}>
                <GlobalContextMockup {...props} />
            </PnpHookOptionProvider>);
    };

    await act(async () => {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider one layer provider", TestComponent);
        expect(shallowEqual(options, globalOptions)).toBe(true);
    });
});

test("PnpReactOptionProvider with createProviderElement()", async () => {
    const globalOptions: PnpHookGlobalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) =>
        createProviderElement(globalOptions, React.createElement(GlobalContextMockup, { ...props }));

    await act(async () => {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider with createProviderElement()", TestComponent);
        expect(shallowEqual(options, globalOptions)).toBe(true);
    });
});

test("PnpReactOptionProvider two layer provider", async () => {
    const globalOptionsL2: PnpHookGlobalOptions = {
        disabled: true,
        error: ErrorMode.Suppress,
        sp: spTest,
    };

    const globalOptionsL1: PnpHookGlobalOptions = {
        disabled: "auto",
        error: ErrorMode.Suppress,
        keepPreviousState: true,
        sp: spTest,
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) => {
        return (
            <PnpHookOptionProvider value={globalOptionsL1}>
                <PnpHookOptionProvider value={globalOptionsL2}>
                    <GlobalContextMockup {...props} />
                </PnpHookOptionProvider>
            </PnpHookOptionProvider>);
    };

    await act(async () => {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider two layer provider", TestComponent);
        expect(shallowEqual(options, globalOptionsL2)).toBe(true);
    });
});

test("PnpReactOptionProvider provider value change", async () => {
    const globalOptionsInit: PnpHookGlobalOptions = {
        disabled: true,
        error: ErrorMode.Suppress,
        keepPreviousState: true,
        sp: spTest,
    };

    const globalOptionsNext: PnpHookGlobalOptions = {
        disabled: false,
        error: console.error,
        keepPreviousState: false,
        sp: spTest,
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) => {
        const [context, setContext] = React.useState<PnpHookGlobalOptions>(globalOptionsInit);

        React.useEffect(() => {
            const timer = setTimeout(() => setContext(globalOptionsNext), 500);
            return () => clearTimeout(timer);
        }, []);

        return (
            <PnpHookOptionProvider value={context}>
                <GlobalContextMockup {...{ ...props, success: context === globalOptionsNext ? props.success : () => { return; } }} />
            </PnpHookOptionProvider>);
    };

    await act(async () => {
        const options = await reactDOMElement.mountTestComponent("PnpReactOptionProvider provider value change", TestComponent);
        expect(shallowEqual(options, globalOptionsNext)).toBe(true);
    });
});

test("usePnpHookOptions hook", async () => {
    const globalOptions: PnpHookGlobalOptions = {
        disabled: false,
        error: ErrorMode.Default,
        keepPreviousState: true,
        sp: spTest,
    };

    const InnerComponent = (props: TestComponentProps<PnpHookGlobalOptions>) => {
        const context = usePnpHookOptions();
        props.success?.(context);

        return (<></>);
    };

    const TestComponent = (props: TestComponentProps<PnpHookGlobalOptions>) => {
        return (
            <PnpHookOptionProvider value={globalOptions}>
                <InnerComponent {...props} />
            </PnpHookOptionProvider>);
    };

    await act(async () => {
        const options = await reactDOMElement.mountTestComponent("usePnpHookOptions hook", TestComponent);
        expect(shallowEqual(options, globalOptions)).toBe(true);
    });
});
