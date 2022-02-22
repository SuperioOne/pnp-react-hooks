/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSDOM } from "jsdom";

export class ReactDOMElement
{
    public readonly rootElement: HTMLDivElement;

    constructor()
    {
        const dom = new JSDOM(`<!DOCTYPE html><div></div>`);

        (global as any).window = dom.window;
        this.rootElement = dom.window.document.createElement("div");
    }

    public mountTestComponent<T extends React.FunctionComponent<TestComponentProps<TReturn> & TProp>, TProp, TReturn>
        (
            testName: string,
            testComponent: T,
            customProps?: TProp): Promise<any>
    {
        return new Promise<TReturn>((resolution, rejection) =>
        {
            const successAction = (data: TReturn) => resolution(data);
            const errorAction = (err: Error) => rejection(err);

            const props: any = {
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

export interface TestComponentProps<TReturn = any>
{
    success: (data: TReturn) => void;
    error: (err: Error) => void;
    testName: string;
}

export const initJSDOM = () => new ReactDOMElement();