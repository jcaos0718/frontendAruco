// src/services/authService.jsx
import axios from 'axios';

//const API_URL = 'http://localhost:8000/api/auth/';
const API_URL = 'https://backendaruco.onrender.com/api/auth/';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login/`, { email, password });
    const userData = response.data;
    if (userData.access) {
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.access}`;
    }
    return userData;
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };
  
  export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.access}`;
      return userData;
    }
    return null;
  };

// Función para registrar un nuevo usuario
export const register = async (username, email,first_name,last_name, password) => {
  const response = await axios.post(`${API_URL}register/`, {
    username,
    email,
    first_name,
    last_name,
    password,
  });
  return response.data;
};

