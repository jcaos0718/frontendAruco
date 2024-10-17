// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '../services/authService';


// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser()); // Inicializa con el usuario guardado en localStorage

  

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    const userData = await authLogin(email, password);
    setUser(userData);

  };

  const logout = () => {
    authLogout();

    setUser(null);
  };

  const updateUserScore = async (newScore) => {
    if (user && user.username && user.token) {
      try {
        //const response = await fetch(`http://localhost:8000/api/auth/user/${user.username}/score`, {
        const response = await fetch(`https://backendaruco.onrender.com/api/auth/user/${user.username}/score`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // Incluye el token si es necesario
          },
          body: JSON.stringify({ score: newScore }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user score');
        }

        // Actualiza el puntaje en el estado local
        const data = await response.json();
        setUser(prevUser => ({ ...prevUser, score: data.score }));

        // También actualiza el estado en el store, si es necesario
        const { setActScore } = useStore.getState();
        setActScore(0); // Resetear actScore después de actualizar el puntaje
      } catch (error) {
        console.error('Error updating user score:', error);
      }
    }
  };


  const value = {
    user,
    login,
    logout,
    updateUserScore,
  };

 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
