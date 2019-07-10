import RestClient from "../utils/RestClient";
import {getLoggedUserId} from "../utils/AuthenticationUtils";
import {ContentType, HttpMethods} from "../utils/Constants";

const ENDPOINT_USER = "/usuarios";

const UserRegisterResource = {
    createUser(requestBody) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USER}`;
        const options = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return RestClient.executeCall(url, options);
    },

    editUser(requestBody) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_USER}/${getLoggedUserId()}`;
        const options = {
            method: HttpMethods.PUT,
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    }
};

export default UserRegisterResource;