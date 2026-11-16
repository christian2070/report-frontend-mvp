import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canDeleteReporte, canEditReporte } from '@/utils/reportePermissions';
import { editarReporteSchema } from '@/screens/EditarReporte/EditarReporteScreen.schema';
import {
  perfilSchema,
  senhaSchema,
} from '@/screens/Perfil/PerfilScreen.schema';
import { CategoriaReporte, StatusReporte, TipoUsuario } from '@/types/enums';
import type { Reporte } from '@/types/reporte.types';

const owner = { id: 'owner', nome: 'Ana', tipo: TipoUsuario.CIDADAO };
const report: Reporte = {
  id: 'report',
  foto: '/uploads/photo.jpg',
  descricao: 'Lâmpada apagada',
  categoria: CategoriaReporte.ILUMINACAO,
  localizacao: 'Rua A',
  status: StatusReporte.ABERTO,
  autor: owner,
  totalAlertas: 3,
  jaAlertado: false,
  createdAt: '2026-11-16T10:00:00Z',
};

test('only the citizen author can edit or delete reports', () => {
  assert.equal(canEditReporte(owner, report), true);
  assert.equal(canDeleteReporte(owner, report), true);
  for (const user of [
    null,
    { ...owner, id: 'other' },
    { ...owner, tipo: TipoUsuario.PREFEITURA },
  ]) {
    assert.equal(canEditReporte(user, report), false);
    assert.equal(canDeleteReporte(user, report), false);
  }
});

test('resolved reports allow deletion but block editing', () => {
  assert.equal(
    canEditReporte(owner, { ...report, status: StatusReporte.RESOLVIDO }),
    false,
  );
  assert.equal(
    canDeleteReporte(owner, { ...report, status: StatusReporte.RESOLVIDO }),
    true,
  );
  assert.equal(
    canEditReporte(owner, { ...report, status: StatusReporte.EM_ANDAMENTO }),
    true,
  );
});

test('report editing accepts retaining or replacing the photo', async () => {
  const values = {
    descricao: report.descricao,
    categoria: report.categoria,
    localizacao: report.localizacao,
  };
  assert.equal(await editarReporteSchema.isValid(values), true);
  assert.equal(
    await editarReporteSchema.isValid({
      ...values,
      foto: new File(['photo'], 'photo.png', { type: 'image/png' }),
    }),
    true,
  );
  assert.equal(
    await editarReporteSchema.isValid({
      ...values,
      foto: new File(['text'], 'file.txt', { type: 'text/plain' }),
    }),
    false,
  );
  assert.equal(
    await editarReporteSchema.isValid({
      ...values,
      foto: new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'big.jpg', {
        type: 'image/jpeg',
      }),
    }),
    false,
  );
});

test('report editing validates description, location and category', async () => {
  const values = {
    descricao: report.descricao,
    categoria: report.categoria,
    localizacao: report.localizacao,
  };
  for (const change of [
    { descricao: ' ' },
    { descricao: 'a'.repeat(301) },
    { localizacao: ' ' },
    { localizacao: 'a'.repeat(501) },
    { categoria: 'INVALID' },
  ]) {
    assert.equal(
      await editarReporteSchema.isValid({ ...values, ...change }),
      false,
    );
  }
});

test('profile can be saved without password fields and with optional neighborhood', async () => {
  const values = { nome: 'Ana', email: 'ana@example.com', bairro: '' };
  assert.equal(await perfilSchema.isValid(values), true);
  assert.equal(await perfilSchema.isValid({ ...values, nome: ' ' }), false);
  assert.equal(
    await perfilSchema.isValid({ ...values, email: 'invalid' }),
    false,
  );
  assert.equal(
    await perfilSchema.isValid({ ...values, bairro: 'a'.repeat(256) }),
    false,
  );
});

test('password change requires current password, minimum length and matching confirmation', async () => {
  const values = {
    senhaAtual: 'current123',
    novaSenha: 'new123456',
    confirmarNovaSenha: 'new123456',
  };
  assert.equal(await senhaSchema.isValid(values), true);
  for (const change of [
    { senhaAtual: '' },
    { novaSenha: '123', confirmarNovaSenha: '123' },
    { confirmarNovaSenha: 'different' },
  ]) {
    assert.equal(await senhaSchema.isValid({ ...values, ...change }), false);
  }
});
