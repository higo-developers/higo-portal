import RestClient from "../utils/RestClient";

const ENDPOINT_BRANDS = "/marcas";
const PATH_MODELS = `/modelos`;

const BrandResource = {
    getAll() {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_BRANDS}`);
    },
    getModelsByBrand(brandId) {
        return RestClient.executeCall(`${process.env.REACT_APP_API_BASE_URL}${ENDPOINT_BRANDS}/${brandId}${PATH_MODELS}`);
    }
};

export default BrandResource;