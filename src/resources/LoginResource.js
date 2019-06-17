import RestClient from "../utils/RestClient";

const ENDPOINT_LOGIN = "/login";

const LoginResource = {
    doLogin(requestBody) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_LOGIN}`;

        const options = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return RestClient.executeCall(url, options);
    }
};

export default LoginResource;