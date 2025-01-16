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
  return request('/games', 'POST',null, true)
}

const deleteGame = (gameId) => {
  return request(`/games/${gameId}`, 'DELETE', null, true);
};

const getGame = (id) => {
  return request(`/games/${id}`, 'GET', null, true)
}

const updateUser = (username, password) => {
  return request('/user', 'PUT', { username, password }, true)
}
const getUser = (id) => {
  return request(`/user/${id}`, 'GET', null, true)
}

const joinGame = (gameId) => {
  return request(`/games/${gameId}/join`, 'POST', null, true);
};

const makeMove = (gameId, row, col) => {
  return request(`/games/${gameId}/move/${row}/${col}`, 'POST', null, true);

}

export { login, register, games, games_add, deleteGame, updateUser, getUser, getGame, joinGame, makeMove };