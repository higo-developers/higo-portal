import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";
import {ContentType, HttpMethods} from "../utils/Constants";
import {validateProfileVehicle} from "../utils/ProfileUtils";

const ENDPOINT_PROFILES = "/perfiles";
const ENDPOINT_VEHICLES = "/vehiculos";

const ProfileResource = {
    getUserVehicles() {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}`;
        return RestClient.executeCall(url);
    },
    getUserVehicleById(vehicleId) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}/${vehicleId}`;
        return RestClient.executeCall(url);
    },
    saveVehicle(profileVehicle) {
        validateProfileVehicle(profileVehicle);

        if (profileVehicle.id)
            return this.updateVehicle(profileVehicle);

        return this.saveNewVehicle(profileVehicle);
    },
    saveNewVehicle(profileVehicle) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}`;
        const options = {
            method: HttpMethods.POST,
            body: JSON.stringify(profileVehicle),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    },
    updateVehicle(profileVehicle) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}/${profileVehicle.id}`;
        const options = {
            method: HttpMethods.PUT,
            body: JSON.stringify(profileVehicle),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    },
    deleteVehicle(profileVehicleId) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}/${profileVehicleId}`;
        const options = {
            method: HttpMethods.DELETE
        };
        return RestClient.executeCall(url, options);
    }
};

export default ProfileResource;