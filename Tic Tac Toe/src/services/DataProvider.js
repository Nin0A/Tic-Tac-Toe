import { request } from './httpClient'

const login = (username, password) => {
  return request('/login', 'POST', { username, password }, true)
}
const register = (username, password) => {
  return request('/register', 'POST', { username, password }, true)
}

const games = () => {
  return request('/games', 'GET', null, true)
}

const games_add = () => {
  return request('/games', 'POST', true)
}

export { login, register, games, games_add }
