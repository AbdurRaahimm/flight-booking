import { useState, useContext, createContext } from 'react';
import { toast } from 'react-toastify';
import { setCookie } from '../utils/cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function
  const login = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(response.message);
        setCookie('token', response.token, 60); 
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return response; 
      } else {
        toast.error(response.message || 'Login failed');
        return null; 
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
      return null; 
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.ok) {
        toast.success(response.message || 'Registration successful');
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
