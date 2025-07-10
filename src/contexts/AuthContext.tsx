import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'free' | 'premium' | 'enterprise';
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // In a real app, validate token with backend
          // For now, simulate a logged-in user
          setUserProfile({
            id: 'user_1',
            email: 'john.doe@example.com',
            name: 'John Doe',
            subscriptionType: 'free'
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: 'user_1',
        email,
        name: email.split('@')[0],
        subscriptionType: 'free'
      };
      
      localStorage.setItem('auth_token', 'mock_token');
      setUserProfile(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const user: User = {
        id: 'user_new',
        email,
        name,
        subscriptionType: 'free'
      };
      
      localStorage.setItem('auth_token', 'mock_token');
      setUserProfile(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('auth_token');
      setUserProfile(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would send a reset email
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    userProfile,
    login,
    signup,
    logout,
    resetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}