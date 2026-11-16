import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { TOKEN_STORAGE_KEY } from '@/constants/storageKeys';
import { authService } from '@/services/auth.service';
import { TipoUsuario } from '@/types/enums';
import type { Usuario, UsuarioResumo } from '@/types/auth.types';
import { Spinner } from '@/components/ui/Spinner';

interface AuthContextValue {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isCidadao: boolean;
  isPrefeitura: boolean;
  login: (token: string, usuario: UsuarioResumo) => void;
  logout: () => void;
  setUsuario: (usuario: Usuario) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

async function fetchCurrentUser(): Promise<Usuario | null> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token) {
    return null;
  }

  return authService.me();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const login = useCallback((token: string, usuarioResumo: UsuarioResumo) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUsuarioState({
      ...usuarioResumo,
      email: '',
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUsuarioState(null);
  }, []);

  const setUsuario = useCallback((nextUsuario: Usuario) => {
    setUsuarioState(nextUsuario);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUsuarioState(currentUser);
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUsuarioState(null);
      } finally {
        setIsInitializing(false);
      }
    };

    void restoreSession();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, [logout]);

  const value = useMemo(
    () => ({
      usuario,
      isAuthenticated: Boolean(usuario),
      isInitializing,
      isCidadao: usuario?.tipo === TipoUsuario.CIDADAO,
      isPrefeitura: usuario?.tipo === TipoUsuario.PREFEITURA,
      login,
      logout,
      setUsuario,
    }),
    [usuario, isInitializing, login, logout, setUsuario],
  );

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
