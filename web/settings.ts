export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST || "http://localhost:5000";

export const CHILDREN_ROUTE = API_HOST + "/children";
export const SUMMARY_ENDPOINT = "/summary";

export const REGISTER_ENDPOINT = "/register";
export const LOGIN_ENDPOINT = "/login";
export const USER_ENDPOINT = "/users";

export const TOKEN_COOKIE_NAME = "cria_token";
export const USER_COOKIE_NAME = "cria_user";
