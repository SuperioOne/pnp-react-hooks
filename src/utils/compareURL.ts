export function compareURL(left: string, right: string)
{
    return encodeURI(left).toLowerCase() === encodeURI(right).toLowerCase();
}