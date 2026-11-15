import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export function Select({
  hasError = false,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`peer w-full appearance-none rounded-lg border bg-white py-2 pl-3 pr-10 text-sm text-gray-900 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
          supports-[appearance:base-select]:[appearance:base-select]
          [&::picker-icon]:hidden
          [&::picker(select)]:[appearance:base-select]
          [&::picker(select)]:rounded-xl [&::picker(select)]:border [&::picker(select)]:border-gray-200 [&::picker(select)]:bg-white [&::picker(select)]:p-1.5 [&::picker(select)]:shadow-lg
          [&::picker(select)]:my-2 [&::picker(select)]:max-h-[min(20rem,50dvh)] [&::picker(select)]:overflow-y-auto
          supports-[appearance:base-select]:[&_option]:flex supports-[appearance:base-select]:[&_option]:min-h-10 supports-[appearance:base-select]:[&_option]:cursor-pointer supports-[appearance:base-select]:[&_option]:items-center
          supports-[appearance:base-select]:[&_option]:rounded-lg supports-[appearance:base-select]:[&_option]:px-3 supports-[appearance:base-select]:[&_option]:py-1 supports-[appearance:base-select]:[&_option]:my-1 supports-[appearance:base-select]:[&_option]:text-sm supports-[appearance:base-select]:[&_option]:text-gray-700
          supports-[appearance:base-select]:[&_option:checked]:bg-blue-50 supports-[appearance:base-select]:[&_option:checked]:font-medium supports-[appearance:base-select]:[&_option:checked]:text-blue-700
          supports-[appearance:base-select]:[&_option:hover]:bg-blue-50
          supports-[appearance:base-select]:[&_option:focus-visible]:bg-blue-100 supports-[appearance:base-select]:[&_option:focus-visible]:text-blue-800 supports-[appearance:base-select]:[&_option:focus-visible]:outline-none
          supports-[appearance:base-select]:[&_option:disabled]:cursor-not-allowed supports-[appearance:base-select]:[&_option:disabled]:text-gray-400
          [&_option::checkmark]:hidden ${
            hasError ? "border-red-500" : "border-gray-300"
          } ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform peer-open:rotate-180 peer-disabled:text-gray-400"
      />
    </div>
  );
}
