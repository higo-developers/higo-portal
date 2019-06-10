import Cryptr from 'cryptr';
import base64 from "base-64";
import utf8 from "utf8";

const cryptr = new Cryptr(process.env.REACT_APP_ENCRYPTION_KEY);

export const encrypt = (input) => { return cryptr.encrypt(input) };
export const decrypt = (input) => { return cryptr.decrypt(input) };

export const encodeBase64 = (input) => { return base64.encode(utf8.encode(input)) };
export const decodeBase64 = (input) => { return utf8.decode(base64.decode(input)) };