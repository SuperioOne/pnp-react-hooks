/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import testEnv from "../../../.config/test-env";
import { formatResponse } from "../formatResponse";
import { TestComponentProps } from "../ReactDOMElement";

export interface CustomHookProps 
{
    useHook: (errCallback: (err) => void) => unknown;
    completeWhen?: (response: any) => boolean;
}

interface _CustomTestComponentProps extends TestComponentProps<unknown>, CustomHookProps { }

/**
 * Basic mockup component for calling custom hooks.
 */
export function CustomHookMockup<P extends _CustomTestComponentProps>(props: P)
{
    const useHook = () =>
    {
        try
        {
            return props.useHook(props.error);
        }
        catch (err)
        {
            props.error(err);
        }
    };

    const response = useHook();

    React.useEffect(() =>
    {
        const isCompleted = props.completeWhen
            ? props.completeWhen(response)
            : response !== undefined;

        if (isCompleted)
        {
            if (testEnv.logOut)
                console.log(formatResponse(props.testName, response));

            props.success(response);
        }
    }, [props, response]);

    return (<div></div>);
}