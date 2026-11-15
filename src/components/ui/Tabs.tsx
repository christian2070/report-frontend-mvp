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
}

export function Tabs({ items, layoutId = 'tabs-indicator' }: TabsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className="relative inline-flex rounded-pill border border-gray-200 bg-white p-1"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          role="tab"
          className={({ isActive }) =>
            `relative z-10 rounded-pill px-5 py-2 text-sm font-semibold transition-colors ${
              isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <motion.span
                  layoutId={reduceMotion ? undefined : layoutId}
                  className="absolute inset-0 rounded-pill bg-blue-600"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
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
