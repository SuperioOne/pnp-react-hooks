import * as React from "react";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { useCurrentUser } from "../../src/hooks/useCurrentUser";
import { TestComponentProps } from "../testUtils/TestComponentProps";
import { useTimeout } from "../testUtils/useTimeout";
import { TestHook } from "../testUtils/hookTest";
import { InitPnpTest } from "../testUtils/InitPnpTest";
import { act } from 'react-dom/test-utils';

beforeAll(() => InitPnpTest());

export function useCurrentUserTest(props: TestComponentProps<ISiteUserInfo | null>)
{
    const user = useCurrentUser({
        exception: props.error
    });

    useTimeout(props.error, props.timeout);

    React.useEffect(() =>
    {
        if (user !== undefined)
        {
            console.log(user);
            props.success(user);
        }
    }, [props, user]);

    return (<div></div>);
}

test("Get current user", async () =>
{
    await act(() =>
        expect(TestHook(useCurrentUserTest)).resolves.not.toBeNull());
});