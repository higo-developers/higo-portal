import RestClient from "../utils/RestClient";

const ENDPOINT_VEHICLES = "/vehiculos";

const VehicleResource = {
    getByParams(params) {
        let url = RestClient.buildUrlWithParams(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_VEHICLES}`, params);
        return RestClient.executeCall(url)
    },
    getById(vehicleId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_VEHICLES}/${vehicleId}`);
    }
};

export default VehicleResource;