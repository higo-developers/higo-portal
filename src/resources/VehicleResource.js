import RestClient from "../utils/RestClient";
import {toPreparedSearchParams} from "../utils/VehicleSearchUtils";

const ENDPOINT_VEHICULOS = "/vehiculos";

const VehicleResource = {
    getByParams(params) {
        let url = RestClient.buildUrlWithParams(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_VEHICULOS}`, params);
        return RestClient.executeCall(url)
    },
    getById(vehicleId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_VEHICULOS}/${vehicleId}`);
    },
    getDataForMap() {
        let minDate = new Date();
        let maxDate = new Date();

        maxDate.setDate(minDate.getDate() + 1);

        const params = { fechaDesde: minDate, fechaHasta: maxDate };

        return this.getByParams(toPreparedSearchParams(params));
    }
};

export default VehicleResource;