import RestClient from "../utils/RestClient";

const ENDPOINT_CC = "/cilindradas";
const ENDPOINT_FUELS = "/combustibles";

const OptionsResource = {
    getCCs() {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_CC}`)
    },
    getFuels() {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_FUELS}`);
    }
};

export default OptionsResource;