const BASE_URL = 'http://localhost:3001';
const request = async (
    endpoint,
    method = 'GET',
    body = null,
    isAuthRequest = false,
   ) => {
    // Récupérer le token
    const token = localStorage.getItem('token');
    // Définir les en-têtes
    const headers = {
    'Content-Type': 'application/json',
    ...(isAuthRequest && token && { Authorization: `Bearer ${token}`
   }),
    };
    // Configurer la requête
    const config = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
    };
    try {
    // Envoyer la requête
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (response.status === 403 || response.status === 401) {
    // Token expired or invalid, remove token and redirect to login
    removeToken();
    window.location.href = '/login';
    return;
    }
    // Gérer la réponse
    if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Something went wrong');
    }
    // Vérifier si la réponse a du contenu
    const contentType = response.headers.get('content-type');
    return contentType && contentType.includes('application/json')
    ? await response.json()
    : null;
    } catch (error) {
    // Gestion des erreurs
    console.error('API Error:', error);
    throw error;
    }
   };

export {request};