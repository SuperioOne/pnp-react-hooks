// TODO: Absolute and relative url check required
export function isUrl(url: string, type: UrlType = UrlType.Any): boolean
{
    return true;
}

export enum UrlType
{
    Any = 3,
    Relative = 1,
    Absolute = 2
}