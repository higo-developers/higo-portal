import RestClient from "../utils/RestClient";
import {ContentType, HttpMethods} from "../utils/Constants";

const ENDPOINT_LOGIN = "/login";

const LoginResource = {
    doLogin(requestBody) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_LOGIN}`;

        const options = {
            method: HttpMethods.POST,
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    }
};

export default LoginResource;