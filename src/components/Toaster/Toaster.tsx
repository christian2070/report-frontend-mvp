import { Toaster } from 'sonner';

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      visibleToasts={3}
      toastOptions={{
        duration: 3200,
        classNames: {
          toast:
            'group border border-gray-200 bg-white text-gray-900 shadow-soft rounded-control font-sans relative overflow-hidden',
          title: 'font-semibold text-inherit',
          description: 'text-gray-600',
          warning: 'border-black',
          info: 'border-black',
        },
      }}
    />
  );
}
