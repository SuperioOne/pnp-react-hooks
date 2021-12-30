import * as React from "react";
import testEnv from "../../.config/test-env";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { WebPropertiesOptions } from "../../src/hooks/useWebProperties";
import { act } from 'react-dom/test-utils';
import { formatResponse } from "../testUtils/formatResponse";
import { initJSDOM, TestComponentProps } from "../testUtils/ReactDOMElement";
import { useWebProperties } from "../../src";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

interface Options extends WebPropertiesOptions, TestComponentProps<unknown | null> { }

function UseWebProperties(props: Options)
{
    const webProps = useWebProperties({
        ...props,
        exception: props.error
    });

    React.useEffect(() =>
    {
        if (webProps !== undefined)
        {
            if (testEnv.logOut)
                console.log(formatResponse(props.testName, webProps));

            props.success(webProps);
        }
    }, [props, webProps]);

    return (<div></div>);
}

test("useWebProperties without query", async () =>
{
    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties without query", UseWebProperties))
            .resolves.not.toBeNull());
});

test("useWebProperties with query", async () =>
{
    const props: WebPropertiesOptions = {
        query: {
            select: ["ThemePrimary", "RectSiteLogoUrl"]
        },
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useWebProperties with query", UseWebProperties, props))
            .resolves.not.toBeNull());
});