import {ProfileVehicle} from "../models/DTO";

const EMPTY_MODEL_ERROR_MESSAGE = "Debe elegir un modelo";
const EMPTY_YEAR_ERROR_MESSAGE = "Debe ingresar una año";
const INVALID_YEAR_FORMAT_ERROR_MESSAGE = "Formato de año incorrecto";
const EMPTY_CAR_PATENT_ERROR_MESSAGE = "Debe ingresar una patente";
const INVALID_CAR_PATENT_FORMAT_ERROR_MESSAGE = "Formato de patente incorrecto";
const EMPTY_CC_ERROR_MESSAGE = "Debe seleccionar un tipo de cilindrada";
const EMPTY_FUEL_ERROR_MESSAGE = "Debe seleccionar un tipo de combustible";

export const validateProfileVehicle = (vehicle = new ProfileVehicle()) => {
    if (!vehicle.modelo)
        throw new Error(EMPTY_MODEL_ERROR_MESSAGE);

    if (!vehicle.anno.trim())
        throw new Error(EMPTY_YEAR_ERROR_MESSAGE);

    if (isNaN(vehicle.anno) || vehicle.anno.length > 4)
        throw new Error(INVALID_YEAR_FORMAT_ERROR_MESSAGE);

    if (!vehicle.patente.trim())
        throw new Error(EMPTY_CAR_PATENT_ERROR_MESSAGE);

    if (vehicle.patente.length > 10)
        throw new Error(INVALID_CAR_PATENT_FORMAT_ERROR_MESSAGE);

    if (!vehicle.cilindrada)
        throw new Error(EMPTY_CC_ERROR_MESSAGE);

    if (!vehicle.combustible)
        throw new Error(EMPTY_FUEL_ERROR_MESSAGE);
};