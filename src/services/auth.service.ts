import http from '@/config/http';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  Usuario,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from '@/types/auth.types';

export const authService = {
  register(data: RegisterRequest) {
    return http
      .post<RegisterResponse>('/auth/register', data)
      .then((res) => res.data);
  },

  login(data: LoginRequest) {
    return http
      .post<LoginResponse>('/auth/login', data)
      .then((res) => res.data);
  },

  me() {
    return http.get<Usuario>('/auth/me').then((res) => res.data);
  },

  updateMe(data: UpdateProfileRequest) {
    return http.patch<Usuario>('/auth/me', data).then((res) => res.data);
  },

  changePassword(data: ChangePasswordRequest) {
    return http
      .patch<{ message: string }>('/auth/me/password', data)
      .then((res) => res.data);
  },
};
