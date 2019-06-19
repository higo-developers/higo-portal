import {isNotNullOrUndefined} from "./Utils";

const STORAGE_KEY = "token";
const STORAGE_VALUE = "valor_sarasa";

export const login = (callback) => {
    debugger;
    if ( !isAuthenticated() ) {
        localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
        callback();
    }
};

export const logout = (callback) => {
    debugger;
    if ( isAuthenticated() ) {
        localStorage.removeItem(STORAGE_KEY);
        callback();
    }
};

export const isAuthenticated = () => {
    return isNotNullOrUndefined( localStorage.getItem(STORAGE_KEY) );
};