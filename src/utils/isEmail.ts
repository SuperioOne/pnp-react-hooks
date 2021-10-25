/*
* RFC6532 UTF-2, UTF-3, UTF-4 are enabled for internalization
* This version doesn't complies fully with RFC5322. Comments, quoted local address, LHD domains are not accepted.
*/
const EMAIL_REGEX = /^(?:([a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,64}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,64}){0,32})@([a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,255}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,255}){0,127}))$/i;

export function isEmail(url: string)
{
    /*
    * 320 characters are too long for RFC3251, do not waste time on regex.
    * (64 octet for local, 255 octet for domain and '@' symbol) 
    * Note: String length isn't valid for unicode emails address since JS length doesn't return byte count.
    */
    if (url.length > 320)
    {
        return false;
    }

    const parts = url.match(EMAIL_REGEX);

    if (parts)
    {
        return getByteLength(parts[1]) <= 64 && getByteLength(parts[2]) <= 255;
    }
    else
    {
        return false;
    }
}

// https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
export function getByteLength(text: string): number
{
    return encodeURIComponent(text)
        .replace(/%[0-9A-F]{2}/gi, "0")
        .length;
}