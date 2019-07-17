import {isNotNullOrUndefined} from "./Utils";

const ADDRESS_COMPONENT_LONG_NAME = "long_name";

const namesObjectMap = {
    locality: "localidad",
    administrative_area_level_2: "partido",
    administrative_area_level_1: "provincia",
    country: "pais"
};

export const getAddressComponentTypeName = (addressComponent) => {
    return namesObjectMap[addressComponent.types[0]]
};

export const getAddressComponentValue = (addressComponent) => {
    return addressComponent[ADDRESS_COMPONENT_LONG_NAME]
};

export const validAddressComponents = (addressComponents) => {
    return isNotNullOrUndefined(addressComponents)
};

export const validAddressComponentType = (addressComponent) => {
    return isNotNullOrUndefined(namesObjectMap[addressComponent.types[0]])
};

export function locationDataAsArray(data) {
    const locationData = [];

    Object.values(namesObjectMap).map((name) => {
        if (isNotNullOrUndefined(data[name]))
            locationData.push(data[name]);
    });

    return locationData;
}