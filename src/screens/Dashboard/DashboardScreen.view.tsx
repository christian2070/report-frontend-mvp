import { Spinner } from '@/components/ui/Spinner';
import type { useDashboardScreen } from '@/screens/Dashboard/DashboardScreen.hooks';
import { categoriaLabels, statusLabels } from '@/utils/labels';

interface DashboardScreenViewProps {
  resumo: ReturnType<typeof useDashboardScreen>['resumo'];
  isLoading: boolean;
}

export function DashboardScreenView({ resumo, isLoading }: DashboardScreenViewProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!resumo) {
    return null;
  }

  const maxCategoria = Math.max(...Object.values(resumo.porCategoria), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral histórica dos reportes da cidade
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Total de reportes</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">
          {resumo.totalReportes}
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-medium text-gray-900">Por status</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(resumo.porStatus).map(([status, total]) => (
            <div
              key={status}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <p className="text-sm text-gray-500">
                {statusLabels[status as keyof typeof statusLabels]}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{total}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-medium text-gray-900">Por categoria</h2>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6">
          {Object.entries(resumo.porCategoria).map(([categoria, total]) => (
            <div key={categoria}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-gray-700">
                  {categoriaLabels[categoria as keyof typeof categoriaLabels]}
                </span>
                <span className="font-medium text-gray-900">{total}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${(total / maxCategoria) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
