import {ContentType, HttpMethods, UserOrigin} from "../utils/Constants";
import RestClient from "../utils/RestClient";

const ENDPOINT_USERS = "/usuario";

const UserResource = {
    getByEmailFromFacebook(email) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USERS}/${email}/origen/${UserOrigin.FACEBOOK}`;
        return RestClient.executeCall(url);
    },
    saveUserFromFacebook(userData) {
        userData.origen = UserOrigin.FACEBOOK;

        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USERS}`;

        const options = {
            method: HttpMethods.POST,
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options)
    }
};

export default UserResource;