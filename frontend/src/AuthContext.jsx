import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const user = localStorage.getItem('user_type')?.toLowerCase();
    if (user === 'admin') {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (user === 'alumnus') {
      setIsAdmin(false);
      setIsLoggedIn(true);
    } else {
      setIsAdmin(false);
      setIsLoggedIn(false);
    }
  }, [login]);



  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
