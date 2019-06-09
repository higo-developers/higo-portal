import base64 from 'base-64';
import utf8 from 'utf8';

export const isNullOrUndefined = (value) => { return value === null || value === undefined; };
export const isNotNullOrUndefined = (value) => { return !isNullOrUndefined(value) };

export const encodeBase64 = (input) => { return base64.encode(utf8.encode(input)) };
export const decodeBase64 = (input) => { return utf8.decode(base64.decode(input)) };