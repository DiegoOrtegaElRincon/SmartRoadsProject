import axios from 'axios';

const API_URL = 'http://localhost:3000';
const SIGNIN_URL = `${API_URL}/admins/signin`;

const AuthService = {
  signIn: async (username, password) => {
    try {
      const response = await axios.post(SIGNIN_URL, { Username: username, Password: password });
      const token = response.data.access_token;

      localStorage.setItem('access_token', token);
      return response.data;
    } catch (error) {
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