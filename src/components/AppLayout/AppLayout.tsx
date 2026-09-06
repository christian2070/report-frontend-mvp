import { Outlet } from 'react-router';

import { LogOut, Plus } from 'lucide-react';
import { Link, NavLink } from 'react-router';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
  }`;

export function AppLayout() {
  const { isAuthenticated, isCidadao, isPrefeitura, logout, usuario } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/feed" className="text-lg font-semibold text-gray-900">
            Reportes urbanos
          </Link>

          <nav className="flex items-center gap-4">
            <NavLink to="/feed" className={navLinkClass}>
              Feed
            </NavLink>

            {isCidadao ? (
              <NavLink to="/reportes/novo" className={navLinkClass}>
                Novo reporte
              </NavLink>
            ) : null}

            {isPrefeitura ? (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            ) : null}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-gray-500 sm:inline">
                  {usuario?.nome}
                </span>
                <Button variant="ghost" onClick={logout} className="px-2">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/cadastro" className={navLinkClass}>
                  Cadastro
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      {isCidadao ? (
        <Link
          to="/reportes/novo"
          className="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700"
          aria-label="Novo reporte"
        >
          <Plus className="h-6 w-6" />
        </Link>
      ) : null}
    </div>
  );
}
