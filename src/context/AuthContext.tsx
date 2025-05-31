import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface Role {
  id_rol: number;
  nombre_rol: string;
}

interface Persona {
  id_persona: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
}

interface User {
  user_id: number;
  username: string;
  correo: string;
  fecha_registro: string;
  activo: boolean;
  id_persona: number;
  persona: Persona;
  roles: Role[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  hasRole: (roleName: string) => boolean;
}

interface LoginResponse {
  access_token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'https://simduf-backend.up.railway.app';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el perfil del usuario');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      throw error;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
            await fetchUserProfile(token);
          } else {
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          localStorage.removeItem('access_token');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const hasRole = (roleName: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => role.nombre_rol.toUpperCase() === roleName.toUpperCase());
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, contrasena: password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 401) {
          throw new Error(errorData?.message || 'Usuario o contraseña incorrectos');
        }
        throw new Error(errorData?.message || `Error en el inicio de sesión (${response.status})`);
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      await fetchUserProfile(data.access_token);
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
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading, hasRole }}>
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