import * as React from "react";
import * as ReactDOM from "react-dom";
import { JSDOM } from "jsdom";
import { TestComponentProps } from "./TestComponentProps";

const ROOT_DIV_ID = "react";

export function TestHook<T extends React.FunctionComponent<TestComponentProps<TReturn>>, TReturn = unknown>(
    testComponent: T,
    timeout: number = 0) 
{
    const dom = new JSDOM(`<!DOCTYPE html><div id="${ROOT_DIV_ID}">Hello world</div>`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).window = dom.window;

    const root = dom.window.document.getElementById(ROOT_DIV_ID);

    return new Promise<TReturn>((resolution, rejection) =>
    {
        const successAction = (data: TReturn) => resolution(data);
        const errorAction = (err: Error) => rejection(err);

        ReactDOM.render(React.createElement(testComponent, {
            timeout: timeout,
            success: successAction,
            error: errorAction
        }), root);
    });
}
