export const ContentType = {
    APPLICATION_JSON: "application/json"
};

export const HttpMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

export const Routes = {
    BASE: "/",
    LOGIN: "/login",
    OPERATIONS: "/operaciones",
    SEARCH: "/search",
    SEARCH_BY_MAP: `${this.SEARCH}/map`,
    VEHICLES: "/vehicles",
    VEHICLE_BY_ID: `${this.VEHICLES}/:id`,
    VEHICLE_BY_ID_RESERVE: `${this.VEHICLE_BY_ID}/reserve`
};