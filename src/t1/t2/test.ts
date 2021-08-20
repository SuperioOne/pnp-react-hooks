import * as React from 'react';

export default function useTest()
{
    const [myState, setMyState] = React.useState<number>(0);

    React.useEffect(() =>
    {
        setTimeout(() => { setMyState(12) }, 10000);
    });

    return myState
}

export interface Fuubar
{
    allow: number;
}

export function test()
{
    return false;
}

export class Test
{
    #test: number;

    constructor()
    {
        this.#test = 123
    }

    public test2()
    {
        return this.#test;
    }
}