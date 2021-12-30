import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSDOM } from "jsdom";

export class ReactDOMElement
{
    public readonly rootElement: HTMLDivElement;

    constructor()
    {
        const dom = new JSDOM(`<!DOCTYPE html><div></div>`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).window = dom.window;
        this.rootElement = dom.window.document.createElement("div");
    }

    public mountTestComponent<T extends React.FunctionComponent<TestComponentProps<TReturn>>, TProp, TReturn = unknown>(
        testName: string,
        testComponent: T,
        customProps?: TProp)
    {
        return new Promise<TReturn>((resolution, rejection) =>
        {
            const successAction = (data: TReturn) => resolution(data);
            const errorAction = (err: Error) => rejection(err);

            const props: TestComponentProps<TReturn> = {
                ...customProps,
                success: successAction,
                error: errorAction,
                testName: testName
            };

            ReactDOM.render(React.createElement(testComponent, props), this.rootElement);
        });
    }

    public unmountComponent()
    {
        ReactDOM.unmountComponentAtNode(this.rootElement);
    }
}

export interface TestComponentProps<TReturn = unknown>
{
    success: (data: TReturn) => void;
    error: (err: Error) => void;
    testName: string;
}

export const initJSDOM = () => new ReactDOMElement();