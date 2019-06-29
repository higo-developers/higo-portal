import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";

const ENDPOINT_USERS = "/usuario";
const ENDPOINT_VEHICULOS = "/vehiculos";

const UserResource = {
    getUserVehicles() {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USERS}/${getLoggedUserId()}${ENDPOINT_VEHICULOS}`;
        return RestClient.executeCall(url);
    }
};

export default UserResource;