import {
  CircleHelp,
  Lightbulb,
  MapPin,
  Signpost,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

import { CategoriaReporte } from '@/types/enums';

export const categoriaIcons: Record<CategoriaReporte, LucideIcon> = {
  [CategoriaReporte.ILUMINACAO]: Lightbulb,
  [CategoriaReporte.BURACO_PAVIMENTACAO]: MapPin,
  [CategoriaReporte.LIXO]: Trash2,
  [CategoriaReporte.SINALIZACAO]: Signpost,
  [CategoriaReporte.OUTROS]: CircleHelp,
};
