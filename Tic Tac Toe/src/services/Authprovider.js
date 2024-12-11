export{
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

function getUserIdentity(){
    return JSON.parse(localStorage.getItem('user'));
}