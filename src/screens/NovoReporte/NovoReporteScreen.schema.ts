import * as yup from "yup";

import { CategoriaReporte } from "@/types/enums";

export const novoReporteSchema = yup.object({
  foto: yup
    .mixed<File>()
    .required("Foto é obrigatória")
    .test("fileType", "Formato inválido", (value) => {
      if (!(value instanceof File)) {
        return false;
      }

      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
  descricao: yup
    .string()
    .required("Descrição é obrigatória")
    .max(300, "Descrição deve ter no máximo 300 caracteres"),
  categoria: yup
    .mixed<CategoriaReporte>()
    .oneOf(Object.values(CategoriaReporte), "Categoria inválida")
    .required("Categoria é obrigatória"),
  localizacao: yup.string().required("Localização é obrigatória"),
});

export type NovoReporteFormValues = {
  foto: File;
  descricao: string;
  categoria: CategoriaReporte;
  localizacao: string;
};
