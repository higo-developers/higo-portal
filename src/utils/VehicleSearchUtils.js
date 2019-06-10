import {decodeBase64, encodeBase64, isNotNullOrUndefined} from './Utils';
import dateFormat from 'dateformat';

const ISO_UTC_FORMAT = "isoUtcDateTime";

const namesObjectMap = {
    administrative_area_level_1: "provincia",
    administrative_area_level_2: "partido",
    country: "pais",
    locality: "localidad"
};

export const getAddressComponentTypeName = (addressComponent) => { return namesObjectMap[addressComponent.types[0]] };
export const getAddressComponentValue = (addressComponent) => { return addressComponent["long_name"] };
export const validAddressComponentType = (addressComponent) => { return isNotNullOrUndefined(namesObjectMap[addressComponent.types[0]]) };
export const validAddressComponents = (addressComponents) => { return isNotNullOrUndefined(addressComponents) };
export const encodePreparedSearchParams = (params) => { return encodeBase64(JSON.stringify(toPreparedSearchParams(params))) };
export const decodeSearchParams = (encodedParams) => { return JSON.parse(decodeBase64(encodedParams)) };

function toPreparedSearchParams(params) {
    let preparedParams = {};

    preparedParams.fechaDesde = dateFormat(params.fechaDesde, ISO_UTC_FORMAT);
    preparedParams.fechaHasta = dateFormat(params.fechaHasta, ISO_UTC_FORMAT);

    extractLocationData(params, preparedParams);

    return preparedParams;
}

function extractLocationData(params, preparedParams) {
    let locacion = params.locacion;
    Object.keys(locacion).forEach((key) => {
        preparedParams[key] = locacion[key]
    })
}