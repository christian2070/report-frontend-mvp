import { Outlet } from "react-router";

import { LogOut, Plus } from "lucide-react";
import { Link, NavLink } from "react-router";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center whitespace-nowrap text-sm font-medium transition-colors ${
    isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
  }`;

export function AppLayout() {
  const { isAuthenticated, isCidadao, isPrefeitura, logout, usuario } =
    useAuth();
  const partesNome = usuario?.nome.trim().split(/\s+/).filter(Boolean) ?? [];
  const iniciais =
    (
      (partesNome[0]?.[0] ?? "") +
      (partesNome.length > 1 ? partesNome[partesNome.length - 1][0] : "")
    ).toLocaleUpperCase("pt-BR") || "U";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:flex sm:gap-6 sm:py-4">
          <Link
            to="/feed"
            className="whitespace-nowrap text-lg font-semibold text-gray-900 sm:mr-auto"
          >
            Reportes urbanos
          </Link>

          <nav
            aria-label="Navegação principal"
            className="col-span-2 row-start-2 flex flex-wrap items-center gap-x-6 border-t border-gray-100 pt-1 sm:border-0 sm:pt-0"
          >
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

            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/cadastro" className={navLinkClass}>
                  Cadastro
                </NavLink>
              </>
            ) : null}
          </nav>

          {isAuthenticated ? (
            <div className="col-start-2 row-start-1 flex shrink-0 items-center gap-2 sm:gap-3">
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700"
                role="img"
                aria-label={usuario?.nome || "Usuário"}
                title={usuario?.nome || "Usuário"}
              >
                {iniciais}
              </span>
              <Button
                variant="ghost"
                onClick={logout}
                aria-label="Sair"
                title="Sair"
              >
                <LogOut className="h-4 w-4 my-1" />
              </Button>
            </div>
          ) : null}
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
