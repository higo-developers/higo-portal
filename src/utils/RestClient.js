const GENERIC_ERROR_MESSAGE = "Ocurrió un error. Intente más tarde";

const RestClient = {
    async executeCall(url, options) {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (e) {
            console.log(e);
            throw new Error(GENERIC_ERROR_MESSAGE);
        }
    },
    buildUrlWithParams(url, params) {
        url = new URL(url);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return url;
    }
};

export default RestClient;