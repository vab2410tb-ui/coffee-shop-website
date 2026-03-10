import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');

    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data. Cleaning up invalid data:', error);
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // After backend verifies and sends user data:
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
