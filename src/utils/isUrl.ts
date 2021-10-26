// Regex are only checking the beginings
const ABSOLUTE_URL_REGEX = /^https?:\/\/[A-Z0-9\u0080-\uffff]/i;
const RELATIVE_URL_REGEX = /^(?:\/$|\/[A-Z0-9_.~\x2d:@%]{1})/i;

export function isUrl(url: string, type: UrlType = UrlType.Any): boolean
{
    switch (type)
    {
        case UrlType.Relative:
            {
                return RELATIVE_URL_REGEX.test(encodeURI(url));
            }
        case UrlType.Absolute:
            {
                return ABSOLUTE_URL_REGEX.test(url);
            }
        default:
            {
                return ABSOLUTE_URL_REGEX.test(url)
                    || RELATIVE_URL_REGEX.test(encodeURI(url));
            }
    }
}

export enum UrlType
{
    Any = 3,
    Relative = 1,
    Absolute = 2
}