import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "@/components/ui/Spinner";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  loading?: boolean;
  children: ReactNode;
}

export function IconButton({
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent text-gray-900 transition-all duration-200 hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
}
