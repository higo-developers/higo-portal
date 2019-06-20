import {isNotNullOrUndefined} from "./Utils";

const STORAGE_KEY = "token";

export const login = (loginData, callback = () => {}) => {
    localStorage.setItem(STORAGE_KEY, "");
    callback();
};

export const logout = (callback = () => {}) => {
    localStorage.removeItem(STORAGE_KEY);
    callback();
};

export const isAuthenticated = () => {
    return isNotNullOrUndefined(localStorage.getItem(STORAGE_KEY));
};