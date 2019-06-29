import {decodeBase64, encodeBase64} from "./EncryptionUtils";

export const encodeReserveDetails = (reserveDetails) => { return encodeBase64(JSON.stringify(reserveDetails)) };
export const decodeReserveDetails = (encodedReserveDetails) => { return JSON.parse(decodeBase64(encodedReserveDetails)) };