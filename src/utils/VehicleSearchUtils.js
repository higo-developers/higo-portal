import {isNotNullOrUndefined} from './Utils';
import {decodeBase64, encodeBase64} from "./EncryptionUtils";
import {dateToIsoUTC} from "./FormatUtils";

export const encodePreparedSearchParams = (params) => { return encodeBase64(JSON.stringify(toPreparedSearchParams(params))) };
export const decodeSearchParams = (encodedParams) => { return JSON.parse(decodeBase64(encodedParams)) };

export function toPreparedSearchParams(params) {
    let preparedParams = {};

    preparedParams.fechaDesde = dateToIsoUTC(params.fechaDesde);
    preparedParams.fechaHasta = dateToIsoUTC(params.fechaHasta);

    if (isNotNullOrUndefined(params.locacion))
        extractLocationData(params, preparedParams);

    return preparedParams;
}

function extractLocationData(params, preparedParams) {
    let locacion = params.locacion;
    Object.keys(locacion).forEach((key) => {
        preparedParams[key] = locacion[key]
    })
}