const RestClient = {
    async executeCall(url, options) {
        const response = await fetch(url, options);
        return await response.json();
    },
    buildUrlWithParams(url, params) {
        var url = new URL(url);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        debugger;
        return url;
    }
};

export default RestClient;