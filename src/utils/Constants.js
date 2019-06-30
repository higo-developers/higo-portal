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
    SEARCH_BY_MAP: "/search/map",
    VEHICLES: "/vehicles",
    VEHICLE_BY_ID: "/vehicles/:id",
    VEHICLE_BY_ID_RESERVE: "/vehicles/:id/reserve",
    PROFILE: "/profile",
    PROFILE_VEHICLES: "/profile/vehicles",
    PROFILE_VEHICLES_NEW: "/profile/vehicles/new",
    PROFILE_VEHICLES_EDIT: "/profile/vehicles/:id/edit"
};

export const OperationStates = {
    APROBADO: "APROBADO",
    CANCELADO: "CANCELADO",
    FINALIZADO: "FINALIZADO",
    PENDIENTE: "PENDIENTE",
    RECHAZADO: "RECHAZADO",
    VIGENTE: "VIGENTE"
};