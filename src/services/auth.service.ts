import http from '@/config/http';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  Usuario,
} from '@/types/auth.types';

export const authService = {
  register(data: RegisterRequest) {
    return http.post<RegisterResponse>('/auth/register', data).then((res) => res.data);
  },

  login(data: LoginRequest) {
    return http.post<LoginResponse>('/auth/login', data).then((res) => res.data);
  },

  me() {
    return http.get<Usuario>('/auth/me').then((res) => res.data);
  },
};
