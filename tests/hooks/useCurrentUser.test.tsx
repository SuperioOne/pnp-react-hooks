import * as React from "react";
import testEnv from "../../.config/test-env";
import { CurrentUserInfoOptions, useCurrentUser } from "../../src/hooks/useCurrentUser";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';
import { formatResponse } from "../testUtils/formatResponse";
import { initJSDOM, TestComponentProps } from "../testUtils/ReactDOMElement";

const reactDOMElement = initJSDOM();

beforeAll(() => InitPnpTest());
afterEach(() => reactDOMElement.unmountComponent());

interface Options extends CurrentUserInfoOptions, TestComponentProps<ISiteUserInfo | null> { }

function UseCurrentUserTest(props: Options)
{
    const user = useCurrentUser({
        ...props,
        exception: props.error
    });

    React.useEffect(() =>
    {
        if (user !== undefined)
        {
            if (testEnv.logOut)
                console.log(formatResponse(props.testName, user));

            props.success(user);
        }
    }, [props, user]);

    return (<div></div>);
}

test("useCurrentUser without query", async () =>
{
    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser without query", UseCurrentUserTest))
            .resolves.not.toBeNull());
});

test("useCurrentUser with select query", async () =>
{
    const props: CurrentUserInfoOptions = {
        query: {
            select: ["ID", "Title"]
        }
    };

    await act(() =>
        expect(reactDOMElement.mountTestComponent("useCurrentUser with select query", UseCurrentUserTest, props))
            .resolves.not.toBeNull());
});