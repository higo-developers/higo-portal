import RestClient from "../utils/RestClient";

const ENDPOINT_VEHICULOS = "/vehiculos";

const VehicleResource = {
    getByParams(params) {
        let url = RestClient.buildUrlWithParams(
            process.env.REACT_APP_API_BASE_URL + ENDPOINT_VEHICULOS,
            params
        );

        return RestClient.executeCall(url, params)
    }
};

export default VehicleResource;