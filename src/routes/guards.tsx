import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';
import { TipoUsuario } from '@/types/enums';

export function RequireAuth() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function RequireCidadao() {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (usuario?.tipo === TipoUsuario.PREFEITURA) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export function RequirePrefeitura() {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (usuario?.tipo === TipoUsuario.CIDADAO) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { isAuthenticated, usuario } = useAuth();

  if (isAuthenticated && usuario) {
    if (usuario.tipo === TipoUsuario.PREFEITURA) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}
