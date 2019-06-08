import { isNotNullOrUndefined } from "./Utils";

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
