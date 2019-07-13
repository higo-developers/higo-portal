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
    OPERATIONS_INITIAL_CONTROL: "/operations/:id/control/initial",
    OPERATIONS_FINAL_CONTROL: "/operations/:id/control/final",
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

export const OperationRoles = {
    ACQUIRER: "ACQUIRER",
    PROVIDER: "PROVIDER"
};

export const OperationStates = {
    PENDIENTE: "PENDIENTE",
    APROBADO: "APROBADO",
    RECHAZADO: "RECHAZADO",
    CANCELADO: "CANCELADO",
    CONTROL_INICIAL: "CONTROL_INICIAL",
    VIGENTE: "VIGENTE",
    CONTROL_FINAL: "CONTROL_FINAL",
    PAGO_PENDIENTE: "PAGO_PENDIENTE",
    FINALIZADO: "FINALIZADO",
    CALIFICADO: "CALIFICADO"
};

export const OperationStatesGroup = {
    PENDING: "PENDIENTES",
    ONGOING: "EN_CURSO",
    FINISHED: "FINALIZADAS"
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