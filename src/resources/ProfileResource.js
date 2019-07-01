import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";

const ENDPOINT_PROFILES = "/perfiles";
const ENDPOINT_VEHICLES= "/vehiculos";

const ProfileResource = {
    getUserVehicles() {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}`;
        return RestClient.executeCall(url);
    },
    getUserVehicleById(vehicleId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_PROFILES}/${getLoggedUserId()}${ENDPOINT_VEHICLES}/${vehicleId}`);
    }
};

export default ProfileResource;