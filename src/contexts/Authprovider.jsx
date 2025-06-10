import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const access = localStorage.getItem('access_token');  // consistent key
    const refresh = localStorage.getItem('refresh_token'); // also store refresh token
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const is_admin = localStorage.getItem('is_admin') === 'true';
    const is_operator = localStorage.getItem('is_operator') === 'true';

    if (access && username && email) {
      return { access, refresh, username, email, is_admin, is_operator };
    }
    return null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem('access_token', auth.access);
      if (auth.refresh) {
        localStorage.setItem('refresh_token', auth.refresh);
      }
      localStorage.setItem('username', auth.username);
      localStorage.setItem('email', auth.email);
      localStorage.setItem('is_admin', auth.is_admin);
      localStorage.setItem('is_operator', auth.is_operator);
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('is_admin');
      localStorage.removeItem('is_operator');
    }
  }, [auth]);

  const saveAuth = (authData) => setAuth(authData);

  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ auth, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
