
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication logic
    let user: User | null = null;
    
    if (email === 'superadmin@sayemzgpt.com' && password === 'admin999') {
      user = { id: 'sa1', name: 'Super Admin', email, role: UserRole.SUPER_ADMIN };
    } else if (email === 'admin@gpt.com' && password === 'admin123') {
      user = { id: 'u1', name: 'Admin User', email, role: UserRole.ADMIN };
    } else if (email === 'user@gpt.com' && password === 'user123') {
      user = { id: 'u2', name: 'John Doe', email, role: UserRole.CUSTOMER };
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setState({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const newUser: User = { id: Date.now().toString(), name, email, role: UserRole.CUSTOMER };
    localStorage.setItem('user', JSON.stringify(newUser));
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
