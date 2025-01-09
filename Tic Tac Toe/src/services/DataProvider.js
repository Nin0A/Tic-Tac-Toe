import { request } from "./httpClient";

const login = (username, password) => {
    return request('/login', 'POST', { username, password }, true);
   };
const register = (username, password) => {
return request('/register', 'POST', { username, password }, true);
};

export { login, register };