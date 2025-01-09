import { request } from "./httpClient";

const login = (username, password) => {
  return request('/login', 'POST', { username, password }, true);
};
const register = (username, password) => {
  return request('/register', 'POST', { username, password }, true);
};

const games_get = () => {
  return request('/games', 'GET', null, true);
}

const games_add = () => {
  return request('/games', 'POST', true);
}

export { login, register, games_get, games_add };
