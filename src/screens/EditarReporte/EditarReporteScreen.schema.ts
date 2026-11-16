import * as yup from 'yup';
import { novoReporteSchema } from '@/screens/NovoReporte/NovoReporteScreen.schema';

export const editarReporteSchema = novoReporteSchema.shape({
  foto: yup
    .mixed<File>()
    .optional()
    .test(
      'fileType',
      'Use uma imagem JPEG, PNG ou WebP',
      (file) =>
        !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    )
    .test(
      'fileSize',
      'A imagem deve ter até 5 MB',
      (file) => !file || file.size <= 5 * 1024 * 1024,
    ),
  descricao: yup
    .string()
    .trim()
    .required('Descrição é obrigatória')
    .max(300, 'Descrição deve ter no máximo 300 caracteres'),
  localizacao: yup
    .string()
    .trim()
    .required('Localização é obrigatória')
    .max(500, 'Localização deve ter no máximo 500 caracteres'),
});

export type EditarReporteFormValues = yup.InferType<typeof editarReporteSchema>;
