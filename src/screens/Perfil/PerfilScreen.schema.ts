import * as yup from 'yup';
import {
  cadastroSchema,
  senhaCadastroSchema,
} from '@/screens/Cadastro/CadastroScreen.schema';

export const perfilSchema = cadastroSchema
  .pick(['nome', 'email', 'bairro'])
  .shape({
    nome: yup
      .string()
      .trim()
      .required('Nome é obrigatório')
      .max(255, 'Nome deve ter no máximo 255 caracteres'),
    email: yup
      .string()
      .trim()
      .email('E-mail inválido')
      .required('E-mail é obrigatório')
      .max(255, 'E-mail deve ter no máximo 255 caracteres'),
    bairro: yup
      .string()
      .trim()
      .max(255, 'Bairro deve ter no máximo 255 caracteres')
      .defined(),
  });

export const senhaSchema = yup.object({
  senhaAtual: yup.string().required('Informe sua senha atual'),
  novaSenha: senhaCadastroSchema,
  confirmarNovaSenha: yup
    .string()
    .required('Confirme a nova senha')
    .oneOf([yup.ref('novaSenha')], 'As senhas não coincidem'),
});

export type PerfilFormValues = yup.InferType<typeof perfilSchema>;
export type SenhaFormValues = yup.InferType<typeof senhaSchema>;
