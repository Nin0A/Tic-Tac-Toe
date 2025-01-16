import { jwtDecode } from 'jwt-decode'
export {
    isAuthenticated,
    setToken,
    removeToken,
    getUserIdentity
}

function isAuthenticated(){
    return localStorage.getItem('token') !== null;
}

function removeToken(){
    localStorage.removeItem('token');
}   

function setToken(token){
    localStorage.setItem('token', token);
}

function getUserIdentity() {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
  return null;
}