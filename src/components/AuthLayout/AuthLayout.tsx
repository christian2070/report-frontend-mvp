import type { ReactNode } from 'react';
import { Link } from 'react-router';

import logo from '@/assets/logo.svg';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  impact?: string;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  impact = 'A cidade melhora quando alguém reporta.',
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-blue-600 p-10 text-white lg:flex">
        <Link to="/feed" aria-label="Reportes urbanos — ir para o feed">
          <img
            src={logo}
            alt="Reportes urbanos"
            width={236}
            height={48}
            className="h-auto w-52 brightness-0 invert"
          />
        </Link>
        <div>
          <p className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            {impact}
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/80">
            Reportes Urbanos conecta cidadãos e prefeitura para resolver problemas
            da cidade.
          </p>
        </div>
        <p className="text-xs tracking-[0.16em] text-white/50">REPORTES URBANOS</p>
      </aside>

      <div className="flex flex-col justify-center px-4 py-10 pt-20 sm:px-8 lg:pt-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/feed" aria-label="Reportes urbanos — ir para o feed">
              <img
                src={logo}
                alt="Reportes urbanos"
                width={236}
                height={48}
                className="h-auto w-44"
              />
            </Link>
          </div>

          <h1 className="text-display">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>

          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-gray-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}
