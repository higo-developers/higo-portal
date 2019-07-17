import RestClient from "../utils/RestClient";
import {ContentType, HttpMethods} from "../utils/Constants";
import {getLoggedUserId} from "../utils/AuthenticationUtils";
import {OperationRequest} from "../models/DTO";

const ENDPOINT_OPERATIONS = "/operaciones";
const ENDPOINT_CONTROL = "/control";

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
    },
    createInitialControl(operationId, request) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERATIONS}/${operationId}${ENDPOINT_CONTROL}`;

        const options = {
            method: HttpMethods.POST,
            body: JSON.stringify(request),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    },
    getOperationControl(operationId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERATIONS}/${operationId}${ENDPOINT_CONTROL}`);
    },
    updateControl(request) {
        const url = `${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_OPERATIONS}/${request.idOperacion}${ENDPOINT_CONTROL}`;

        const options = {
            method: HttpMethods.PUT,
            body: JSON.stringify(request),
            headers: {
                'Content-Type': ContentType.APPLICATION_JSON
            }
        };

        return RestClient.executeCall(url, options);
    }
};

export default OperationResource;