import RestClient from "../utils/RestClient";

const ENDPOINT_VEHICULOS = "/vehiculos";

function buildUrlWithParams(params) {
    let url = new URL(process.env.REACT_APP_API_BASE_URL + ENDPOINT_VEHICULOS);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}

const VehicleResource = {
    getByParams(params) {
        let url = buildUrlWithParams(params);
        return RestClient.executeCall(url, {method: "GET"});
    }
};

export default VehicleResource;