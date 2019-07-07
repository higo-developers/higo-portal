import {UserOrigin} from "../utils/Constants";
import RestClient from "../utils/RestClient";

const ENDPOINT_USERS = "/usuario";

const UserResource = {
    getByEmailFromFacebook(email) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USERS}/${email}/origen/${UserOrigin.FACEBOOK}`;
        return RestClient.executeCall(url);
    }
};

export default UserResource;