/**
 * @remarks this function does not validate URL syntax.
 */
export function compareURL(left: string, right: string)
{
    const l = _removeTrailingSlash(left);
    const r = _removeTrailingSlash(right);

    return encodeURI(r).toLowerCase() === encodeURI(l).toLowerCase();
}

function _removeTrailingSlash(val: string)
{
    return val.lastIndexOf("/") === val.length - 1
        ? val.substring(0, val.length - 1)
        : val;
}