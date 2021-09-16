/* https://datatracker.ietf.org/doc/html/rfc4122
 * Regex source is https://github.com/uuidjs/uuid/blob/master/src/regex.js
 * 
 * in v4  `Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively`
 * which makes clock_seq_hi_and_reserved first hex can be 0x1000 (8), 0x10001 (9), 0x1010 (A), 0x1011 (B).  
 */
const _guidRegex = new RegExp(/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/, "i");

export function isUUID(value: string)
{
    return _guidRegex.test(value);
}