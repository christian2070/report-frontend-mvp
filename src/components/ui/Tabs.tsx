import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from 'react-router';

interface TabItem {
  to: string;
  label: string;
  end?: boolean;
}

interface TabsProps {
  items: TabItem[];
  layoutId?: string;
  className?: string;
}

export function Tabs({ items, layoutId = 'tabs-indicator', className = '' }: TabsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className={`relative flex w-full rounded-pill bg-gray-100 p-1 sm:inline-flex sm:w-fit ${className}`}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          role="tab"
          className={({ isActive }) =>
            `relative z-10 inline-flex min-h-9 flex-1 items-center justify-center rounded-pill px-5 text-sm font-semibold transition-colors duration-200 focus-visible:ring-offset-gray-100 sm:flex-none ${
              isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.span
                  layoutId={reduceMotion ? undefined : layoutId}
                  aria-hidden
                  className="absolute inset-0 rounded-pill bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
