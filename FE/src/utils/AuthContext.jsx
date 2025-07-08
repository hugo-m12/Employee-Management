import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  const login = (userData) => {
    setLoggedUser(userData);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);