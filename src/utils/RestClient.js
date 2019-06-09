const RestClient = {
    async executeCall(url, options) {
        const response = await fetch(url, options);
        return await response.json();
    }
};

export default RestClient;