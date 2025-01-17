import React, { createContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(); // Ensure this is exported correctly

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutToastShown = useRef(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUsername && storedRole && storedUserId) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setRole(storedRole);
      setUserId(storedUserId);
    } else {
      console.log("User not authenticated on reload");
    }
    setLoading(false);
  }, []);

  const login = (username, token, role, userId) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUsername(username);
    setRole(role);
    setUserId(userId);
    logoutToastShown.current = false; // Reset the ref on login
  };;

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUsername('');
    setRole('');
    setUserId(null);
    if (!logoutToastShown.current) {
      toast.success("You have been logged out successfully.");
      logoutToastShown.current = true; // Set ref to true to prevent showing the toast again
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, role, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
