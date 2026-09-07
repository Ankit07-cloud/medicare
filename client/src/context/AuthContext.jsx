import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('medicare_user');
    const savedToken = localStorage.getItem('medicare_token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    const userData = response.data;
    setUser(userData);
    localStorage.setItem('medicare_user', JSON.stringify(userData));
    localStorage.setItem('medicare_token', userData.token);
    return userData;
  };

  const register = async (patientData) => {
    const response = await API.post('/auth/register', patientData);
    const userData = response.data;
    setUser(userData);
    localStorage.setItem('medicare_user', JSON.stringify(userData));
    localStorage.setItem('medicare_token', userData.token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicare_user');
    localStorage.removeItem('medicare_token');
  };

  const updateProfileState = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('medicare_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfileState }}>
      {children}
    </AuthContext.Provider>
  );
};
