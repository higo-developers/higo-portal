import RestClient from "../utils/RestClient";
import {ContentType, HttpMethods} from "../utils/Constants";

const ENDPOINT_OPERACIONES = "/operaciones";

const OperationResource = {
    doOperation(requestBody) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERACIONES}`;

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

export default OperationResource;