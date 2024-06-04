/*
 * RFC6532 UTF-2, UTF-3, UTF-4 are enabled for internalization
 * This version doesn't complies fully with RFC5322. Comments, quoted local address, LHD domains are not accepted.
 */
const EMAIL_REGEX =
  /^(?:([a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,64}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,64}){0,32})@([a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,255}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\x2d\u0080-\uffff]{1,255}){0,127}))$/i;

/* https://datatracker.ietf.org/doc/html/rfc4122
 * Regex source is https://github.com/uuidjs/uuid/blob/master/src/regex.js
 *
 * in v4  `Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively`
 * which makes clock_seq_hi_and_reserved first hex can be 0x1000 (8), 0x10001 (9), 0x1010 (A), 0x1011 (B).
 */
const GUID_REGEX =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
const ABSOLUTE_URL_REGEX = /^https?:\/\/[A-Z0-9\u0080-\uffff]/i;
const RELATIVE_URL_REGEX = /^(?:\/$|\/[A-Z0-9_.~\x2d:@%]{1})/i;
const UTF_8_ENCODER = new TextEncoder();

/**
 * Returns actual byte length of the string.
 * @param {string} str
 * @returns {number}
 */
function getByteLen(str) {
  return UTF_8_ENCODER.encode(str).byteLength;
}

/**
 * Checks if string is a valid email.
 * Notes, RFC6532 UTF-2, UTF-3, UTF-4 are enabled for internalization. This function doesn't complies fully with RFC5322.
 * Comments, quoted local address, LHD domains are not considered as valid email.
 *
 * @param {string} str
 * @returns {boolean}
 */
export function isEmail(str) {
  /*
   * 320 characters are too long for RFC5321, do not waste time on regex.
   * (64 octet for local, 255 octet for domain and '@' symbol)
   * Note: String length isn't valid for unicode emails address since JS length doesn't return byte count.
   */
  if (str.length > 320) {
    return false;
  }

  const parts = str.match(EMAIL_REGEX);

  if (parts) {
    return getByteLen(parts[1]) <= 64 && getByteLen(parts[2]) <= 255;
  } else {
    return false;
  }
}

/**
 * Returns true if value is uuid version 4, otherwise returns false
 * @param {string} value
 * @returns {boolean}
 */
export function isUUID(value) {
  return GUID_REGEX.test(value);
}

/**
 * @typedef {1 | 2 | 3} UrlTypes
 **/

/**
 * @type {{Relative: 1; Absolute: 2; Any:3}}
 */
export const UrlType = {
  Relative: 1,
  Absolute: 2,
  Any: 3,
};

/**
 * @param {string} url
 * @param {number} [type=3]
 * @returns {boolean}
 */
export function isUrl(url, type = 3) {
  switch (type) {
    case UrlType.Relative: {
      return RELATIVE_URL_REGEX.test(encodeURI(url));
    }
    case UrlType.Absolute: {
      return ABSOLUTE_URL_REGEX.test(url);
    }
    default: {
      return (
        ABSOLUTE_URL_REGEX.test(url) || RELATIVE_URL_REGEX.test(encodeURI(url))
      );
    }
  }
}
