import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";

const ENDPOINT_PROFILES = "/perfiles";
const ENDPOINT_VEHICULOS = "/vehiculos";

const ProfileResource = {
    getUserVehicles() {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICULOS}`;
        return RestClient.executeCall(url);
    },
    getUserVehicleById(vehicleId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICULOS}/${vehicleId}`);
    }
};

export default ProfileResource;