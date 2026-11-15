import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  LogOut,
  Newspaper,
  Plus,
  UserRound,
} from 'lucide-react';

import { Logo } from '@/components/Logo/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { tipoUsuarioLabels } from '@/utils/labels';

const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex min-h-11 items-center px-1 text-sm font-semibold transition-colors ${
    isActive
      ? 'text-black after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-black'
      : 'text-gray-600 hover:text-black'
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
    isActive ? 'text-black' : 'text-gray-400'
  }`;

export function AppLayout() {
  const { isAuthenticated, isCidadao, isPrefeitura, logout, usuario } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [menuOpen]);

  const showBottomNav = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-soft' : ''
        }`}
        style={{
          height: scrolled ? 'var(--header-height-scrolled)' : 'var(--header-height)',
        }}
      >
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4">
          <Logo size={scrolled ? 'sm' : 'md'} />

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 md:flex"
          >
            <NavLink to="/feed" className={desktopNavClass}>
              Feed
            </NavLink>

            {isCidadao ? (
              <NavLink to="/reportes/novo" className={desktopNavClass}>
                Novo reporte
              </NavLink>
            ) : null}

            {isPrefeitura ? (
              <NavLink to="/dashboard" className={desktopNavClass}>
                Dashboard
              </NavLink>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className="inline-flex min-h-9 items-center justify-center rounded-pill border border-black bg-white px-3 text-xs font-semibold text-black transition-all hover:bg-black hover:text-white"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="inline-flex min-h-9 items-center justify-center rounded-pill bg-black px-3 text-xs font-semibold text-white transition-all hover:bg-gray-900"
                >
                  Criar conta
                </Link>
              </div>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-label="Menu da conta"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="rounded-full transition-transform active:scale-95"
                >
                  <Avatar name={usuario?.nome ?? 'Usuário'} size="sm" />
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-card border border-gray-200 bg-white py-2 shadow-lift"
                  >
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {usuario?.nome}
                      </p>
                      <p className="text-caption">
                        {usuario ? tipoUsuarioLabels[usuario.tipo] : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" aria-hidden />
                      Sair
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </header>

      <main
        className={`mx-auto max-w-5xl px-4 py-6 ${
          showBottomNav ? 'pb-[calc(var(--bottom-nav-height)+1.5rem)] md:pb-6' : ''
        }`}
      >
        <Outlet />
      </main>

      {/* Bottom tab bar — mobile */}
      <nav
        aria-label="Navegação inferior"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-md md:hidden safe-bottom"
        style={{ height: 'var(--bottom-nav-height)' }}
      >
        <div className="mx-auto flex h-full max-w-lg items-stretch px-2">
          <NavLink to="/feed" className={mobileNavClass}>
            <Newspaper className="h-5 w-5" aria-hidden />
            Feed
          </NavLink>

          {isCidadao ? (
            <NavLink
              to="/reportes/novo"
              className="relative -mt-5 flex flex-1 flex-col items-center justify-end gap-1 pb-2 text-[11px] font-medium text-gray-900"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lift transition-transform active:scale-95">
                <Plus className="h-6 w-6" aria-hidden />
              </span>
              Novo
            </NavLink>
          ) : isPrefeitura ? (
            <NavLink to="/dashboard" className={mobileNavClass}>
              <LayoutDashboard className="h-5 w-5" aria-hidden />
              Dashboard
            </NavLink>
          ) : (
            <NavLink to="/cadastro" className={mobileNavClass}>
              <Plus className="h-5 w-5" aria-hidden />
              Conta
            </NavLink>
          )}

          {isAuthenticated ? (
            <button
              type="button"
              className="flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium text-gray-400"
              onClick={() => setMenuOpen(true)}
            >
              <UserRound className="h-5 w-5" aria-hidden />
              Conta
            </button>
          ) : (
            <NavLink to="/login" className={mobileNavClass}>
              <UserRound className="h-5 w-5" aria-hidden />
              Entrar
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}
