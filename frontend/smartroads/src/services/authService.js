import axios from 'axios';

const API_URL = 'http://localhost:3000';
const SIGNIN_URL = `${API_URL}/admins/signin`;

// Configuración de Axios con un tiempo de espera extendido
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Tiempo de espera de 10 segundos
});


const AuthService = {
  signIn: async (username, password) => {
    try {
      // Usar la instancia de Axios con el tiempo de espera extendido
      const response = await axiosInstance.post("/admins/signin", { Username: username, Password: password });
      const token = response.data.access_token;
      console.log(token);
      localStorage.setItem('access_token', token);
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('The sign-in request timed out. Please try again or check your network connection.');
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server response error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  },
  getAuthToken: () => {
    return localStorage.getItem('access_token');
  },
  isAuthenticated: () => {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  },

};

export default AuthService;