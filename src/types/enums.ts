export enum TipoUsuario {
  CIDADAO = 'CIDADAO',
  PREFEITURA = 'PREFEITURA',
}

export enum CategoriaReporte {
  ILUMINACAO = 'ILUMINACAO',
  BURACO_PAVIMENTACAO = 'BURACO_PAVIMENTACAO',
  LIXO = 'LIXO',
  SINALIZACAO = 'SINALIZACAO',
  OUTROS = 'OUTROS',
}

export enum StatusReporte {
  ABERTO = 'ABERTO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  RESOLVIDO = 'RESOLVIDO',
}

export enum OrdenacaoFeed {
  ALERTAS = 'alertas',
  RECENTES = 'recentes',
}
