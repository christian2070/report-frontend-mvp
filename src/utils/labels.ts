import {
  CategoriaReporte,
  StatusReporte,
  TipoUsuario,
} from '@/types/enums';

export const categoriaLabels: Record<CategoriaReporte, string> = {
  [CategoriaReporte.ILUMINACAO]: 'Iluminação pública',
  [CategoriaReporte.BURACO_PAVIMENTACAO]: 'Buraco / Pavimentação',
  [CategoriaReporte.LIXO]: 'Lixo acumulado',
  [CategoriaReporte.SINALIZACAO]: 'Sinalização danificada',
  [CategoriaReporte.OUTROS]: 'Outros',
};

export const statusLabels: Record<StatusReporte, string> = {
  [StatusReporte.ABERTO]: 'Aberto',
  [StatusReporte.EM_ANDAMENTO]: 'Em andamento',
  [StatusReporte.RESOLVIDO]: 'Resolvido',
};

export const tipoUsuarioLabels: Record<TipoUsuario, string> = {
  [TipoUsuario.CIDADAO]: 'Cidadão',
  [TipoUsuario.PREFEITURA]: 'Prefeitura',
};

export const categoriaOptions = Object.values(CategoriaReporte).map((value) => ({
  value,
  label: categoriaLabels[value],
}));

export function getNextStatus(current: StatusReporte): StatusReporte | null {
  if (current === StatusReporte.ABERTO) {
    return StatusReporte.EM_ANDAMENTO;
  }

  if (current === StatusReporte.EM_ANDAMENTO) {
    return StatusReporte.RESOLVIDO;
  }

  return null;
}

export function getNextStatusLabel(current: StatusReporte): string | null {
  const next = getNextStatus(current);

  if (!next) {
    return null;
  }

  return statusLabels[next];
}

export function getNextStatusActionLabel(current: StatusReporte): string | null {
  const next = getNextStatus(current);

  if (next === StatusReporte.EM_ANDAMENTO) {
    return 'Marcar como em andamento';
  }

  if (next === StatusReporte.RESOLVIDO) {
    return 'Marcar como resolvido';
  }

  return null;
}
