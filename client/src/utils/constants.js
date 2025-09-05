export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_URL = `api/auth`;
export const SIGNUP_URL = `${AUTH_URL}/signup`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const GET_USER_INFO = `${AUTH_URL}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_URL}/update-profile`;
export const ADD_IMAGE_PROFILE_ROUTE = `${AUTH_URL}/add-profile-image`;
export const REMOVE_IMAGE_PROFILE_ROUTE = `${AUTH_URL}/remove-image`;