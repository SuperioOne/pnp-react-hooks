export function mergeDependencies(deps: Readonly<unknown[]>, ...additionalDeps: Array<Readonly<undefined | unknown[]>>)
{
    return deps.concat(...additionalDeps.filter(e => e !== undefined));
}