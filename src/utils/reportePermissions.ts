import type { UsuarioResumo } from '@/types/auth.types';
import { StatusReporte, TipoUsuario } from '@/types/enums';
import type { Reporte } from '@/types/reporte.types';

export function canDeleteReporte(
  usuario: UsuarioResumo | null,
  reporte: Reporte,
): boolean {
  return (
    usuario?.tipo === TipoUsuario.CIDADAO && usuario.id === reporte.autor.id
  );
}

export function canEditReporte(
  usuario: UsuarioResumo | null,
  reporte: Reporte,
): boolean {
  return (
    canDeleteReporte(usuario, reporte) &&
    reporte.status !== StatusReporte.RESOLVIDO
  );
}
