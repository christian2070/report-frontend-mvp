import type { ReactNode } from 'react';

import { Logo } from '@/components/Logo/Logo';

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
      <aside className="relative hidden flex-col justify-between bg-black p-10 text-white lg:flex">
        <Logo variant="inverted" size="lg" to="/feed" />
        <div>
          <p className="max-w-md text-4xl font-bold leading-tight tracking-tight">
            {impact}
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            REPORT conecta cidadãos e prefeitura para resolver problemas urbanos com clareza.
          </p>
        </div>
        <p className="text-xs tracking-[0.2em] text-white/40">REPORT</p>
      </aside>

      <div className="flex flex-col justify-center px-4 py-10 sm:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="md" to="/feed" />
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
