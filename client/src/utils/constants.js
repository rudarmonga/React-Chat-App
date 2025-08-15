export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_URL = `api/auth`;
export const SIGNUP_URL = `${AUTH_URL}/signup`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const GET_USER_INFO = `${AUTH_URL}/user-info`;