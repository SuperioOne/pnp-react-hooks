import * as React from "react";
import testEnv from "../../.config/test-env";
import { IWebInfo } from "@pnp/sp/webs/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { WebInfoOptions, useWebInfo } from "../../src/hooks/useWebInfo";
import { act } from 'react-dom/test-utils';
import { formatResponse } from "../testUtils/formatResponse";
import { initJSDOM, TestComponentProps } from "../testUtils/ReactDOMElement";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

interface Options extends WebInfoOptions, TestComponentProps<IWebInfo | null> { }

function UseWebInfoTest(props: Options)
{
    const web = useWebInfo({
        ...props,
        exception: props.error
    });

    React.useEffect(() =>
    {
        if (web !== undefined)
        {
            if (testEnv.logOut)
                console.log(formatResponse(props.testName, web));

            props.success(web);
        }
    }, [props, web]);

    return (<div></div>);
}

test("useWebInfo without query", async () =>
{
    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo without query", UseWebInfoTest))
            .resolves.not.toBeNull());
});

test("useWebInfo with query", async () =>
{
    const props: WebInfoOptions = {
        query: {
            select: ["ID", "Title"]
        },
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebInfo with query", UseWebInfoTest, props))
            .resolves.not.toBeNull());
});