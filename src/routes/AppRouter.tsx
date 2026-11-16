import { Navigate, Route, Routes } from 'react-router';

import { AppLayout } from '@/components/AppLayout/AppLayout';
import { CadastroScreen } from '@/screens/Cadastro/CadastroScreen';
import { DashboardScreen } from '@/screens/Dashboard/DashboardScreen';
import { FeedScreen } from '@/screens/Feed/FeedScreen';
import { LoginScreen } from '@/screens/Login/LoginScreen';
import { NovoReporteScreen } from '@/screens/NovoReporte/NovoReporteScreen';
import { ReporteDetalheScreen } from '@/screens/ReporteDetalhe/ReporteDetalheScreen';
import { EditarReporteScreen } from '@/screens/EditarReporte/EditarReporteScreen';
import { PerfilScreen } from '@/screens/Perfil/PerfilScreen';
import {
  PublicOnlyRoute,
  RequireAuth,
  RequireCidadao,
  RequirePrefeitura,
} from '@/routes/guards';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<CadastroScreen />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/feed" element={<FeedScreen tab="ativos" />} />
        <Route
          path="/feed/resolvidos"
          element={<FeedScreen tab="resolvidos" />}
        />
        <Route path="/reportes/:id" element={<ReporteDetalheScreen />} />

        <Route element={<RequireCidadao />}>
          <Route path="/reportes/novo" element={<NovoReporteScreen />} />
          <Route
            path="/reportes/:id/editar"
            element={<EditarReporteScreen />}
          />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/perfil" element={<PerfilScreen />} />
        </Route>

        <Route element={<RequirePrefeitura />}>
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
}
