import {isNotNullOrUndefined} from "./Utils";

const STORAGE_TOKEN_KEY = "token";
const STORAGE_USER_NAME_KEY = "username";
const STORAGE_USER_ID_KEY = "user";

export const login = (loginData, callback = () => {}) => {
    localStorage.setItem(STORAGE_TOKEN_KEY, loginData.token);
    setUserData(loginData.usuario);
    callback();
};

export const logout = (callback = () => {}) => {
    localStorage.clear();
    callback();
};

export const isAuthenticated = () => {
    return isNotNullOrUndefined(localStorage.getItem(STORAGE_TOKEN_KEY));
};

export const getLoggedUserId = () => {
    return localStorage.getItem(STORAGE_USER_ID_KEY);
};

export const getLoggedUserName = () => {
    return localStorage.getItem(STORAGE_USER_NAME_KEY);
};

const setUserData = (userData) => {
    localStorage.setItem(STORAGE_USER_NAME_KEY, userData.username);
    localStorage.setItem(STORAGE_USER_ID_KEY, userData.id);
};