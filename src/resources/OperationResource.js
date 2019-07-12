import RestClient from "../utils/RestClient";
import {ContentType, HttpMethods} from "../utils/Constants";
import {getLoggedUserId} from "../utils/AuthenticationUtils";
import {OperationRequest} from "../models/DTO";

const ENDPOINT_OPERATIONS = "/operaciones";

const OperationResource = {
    create(details) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERATIONS}`;

        const request = new OperationRequest(details.fechaDesde, details.fechaHasta, getLoggedUserId(), details.vehicle.id, null);

        const options = {
            method: HttpMethods.POST,
            body: JSON.stringify(request),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    },
    changeStatus(operationId, status) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERATIONS}`;

        const options = {
            method: HttpMethods.PUT,
            body: JSON.stringify({idOperacion: operationId, codEstado: status}),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    }
};

export default OperationResource;