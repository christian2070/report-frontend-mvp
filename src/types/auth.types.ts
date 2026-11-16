import type { TipoUsuario } from '@/types/enums';

export interface UsuarioResumo {
  id: string;
  nome: string;
  tipo: TipoUsuario;
}

export interface Usuario extends UsuarioResumo {
  email: string;
  bairro?: string | null;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  bairro?: string;
}

export interface RegisterResponse extends Usuario {
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioResumo;
}

export interface UpdateProfileRequest {
  nome: string;
  email: string;
  bairro?: string;
}

export interface ChangePasswordRequest {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}
