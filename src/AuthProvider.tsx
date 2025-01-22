import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';
import { LoginResponse } from './types';

interface AuthContextType {
  token: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access-token') || null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const response: LoginResponse = await login({ email, password });
      if (response.token) {
        setToken(response.token);
        localStorage.setItem('access-token', response.token);
        navigate('/home');
      } else {
        throw new Error(response?.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('access-token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};