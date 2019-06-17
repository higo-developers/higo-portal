import { isNotNullOrUndefined } from './Utils';
import { decodeBase64, encodeBase64 } from "./EncryptionUtils";
import { dateToIsoUTC } from "./FormatUtils";

const namesObjectMap = {
    locality: "localidad",
    administrative_area_level_2: "partido",
    administrative_area_level_1: "provincia",
    country: "pais"
};

export const getAddressComponentTypeName = (addressComponent) => { return namesObjectMap[addressComponent.types[0]] };
export const getAddressComponentValue = (addressComponent) => { return addressComponent["long_name"] };
export const validAddressComponentType = (addressComponent) => { return isNotNullOrUndefined(namesObjectMap[addressComponent.types[0]]) };
export const validAddressComponents = (addressComponents) => { return isNotNullOrUndefined(addressComponents) };
export const encodePreparedSearchParams = (params) => { return encodeBase64(JSON.stringify(toPreparedSearchParams(params))) };
export const decodeSearchParams = (encodedParams) => { return JSON.parse(decodeBase64(encodedParams)) };

export function locationDataAsArray(data) {
    const locationData = [];

    Object.values(namesObjectMap).map((name) => {
        if (isNotNullOrUndefined(data[name]))
            locationData.push(data[name]);
    });

    return locationData;
}

function toPreparedSearchParams(params) {
    let preparedParams = {};

    preparedParams.fechaDesde = dateToIsoUTC(params.fechaDesde);
    preparedParams.fechaHasta = dateToIsoUTC(params.fechaHasta);

    extractLocationData(params, preparedParams);

    return preparedParams;
}

function extractLocationData(params, preparedParams) {
    let locacion = params.locacion;
    Object.keys(locacion).forEach((key) => {
        preparedParams[key] = locacion[key]
    })
}