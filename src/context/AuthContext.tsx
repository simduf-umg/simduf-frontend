import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface LoginResponse {
  access_token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'https://simduf-backend.up.railway.app';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log('Intentando login con:', `${API_URL}/auth/login`);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, contrasena: password }),
      });

      console.log('Status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log('Error data:', errorData);
        if (response.status === 401) {
          throw new Error(errorData?.message || 'Usuario o contraseña incorrectos');
        }
        throw new Error(errorData?.message || `Error en el inicio de sesión (${response.status})`);
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error completo durante el login:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error inesperado durante el inicio de sesión');
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok && response.status !== 401) {
          throw new Error('Error al cerrar sesión');
        }
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/signin');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 