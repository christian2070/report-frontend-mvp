import * as yup from 'yup';

export const senhaCadastroSchema = yup
  .string()
  .min(6, 'Senha deve ter no mínimo 6 caracteres')
  .required('Senha é obrigatória');

export const cadastroSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: senhaCadastroSchema,
  bairro: yup.string().optional(),
});

export type CadastroFormValues = yup.InferType<typeof cadastroSchema>;
