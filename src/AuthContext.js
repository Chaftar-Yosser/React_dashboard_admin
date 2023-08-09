import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    console.log(newToken)
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    localStorage.removeItem('token');
    console.log("aaaaaaaaaaaaaaaaa")
  };

  return (
    <AuthContext.Provider value={{ token, login, logout , isLogin : !! token }}>
      {children}
    </AuthContext.Provider>
  );
};