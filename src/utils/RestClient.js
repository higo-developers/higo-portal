const RestClient = {
    async executeCall(url, options) {
        const response = await fetch(url, options);
        return await response.json();
    },
    buildUrlWithParams(url, params) {
        url = new URL(url);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return url;
    }
};

export default RestClient;