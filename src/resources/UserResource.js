import {ContentType, HttpMethods, UserOrigin} from "../utils/Constants";
import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";

const ENDPOINT_USERS = "/usuarios";
const ENDPOINT_USER_OPERATIONS = "/operaciones";

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
    },
    getUserOperations() {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USERS}/${getLoggedUserId()}${ENDPOINT_USER_OPERATIONS}`);
    }
};

export default UserResource;