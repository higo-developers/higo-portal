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
    OPERATIONS: "/operations",
    SEARCH: "/search",
    SEARCH_BY_MAP: "/search/map",
    VEHICLES: "/vehicles",
    VEHICLE_BY_ID: "/vehicles/:id",
    VEHICLE_BY_ID_RESERVE: "/vehicles/:id/reserve",
    EDIT_USER:"/edit",
    REGISTER_USER:"/register",
    PROFILE: "/profile",
    PROFILE_VEHICLES: "/profile/vehicles",
    PROFILE_VEHICLES_NEW: "/profile/vehicles/new",
    PROFILE_VEHICLES_EDIT: "/profile/vehicles/:id/edit",
    COMPLETE_USER_DATA: "/complete-login"
};

export const OperationStates = {
    APROBADO: "APROBADO",
    CANCELADO: "CANCELADO",
    FINALIZADO: "FINALIZADO",
    PENDIENTE: "PENDIENTE",
    RECHAZADO: "RECHAZADO",
    VIGENTE: "VIGENTE"
};

export const OperationStatesGroup = {
    PENDIENTES: "PENDIENTES",
    EN_CURSO: "EN_CURSO",
    FINALIZADAS: "FINALIZADAS"
};

export const VehicleStates = {
    ACTIVO: "ACTIVO",
    INACTIVO: "INACTIVO",
    PENDIENTE: "PENDIENTE",
    ELIMINADO: "ELIMINADO"
};

export const UserOrigin = {
    PORTAL: "PORTAL",
    FACEBOOK: "FACEBOOK"
};