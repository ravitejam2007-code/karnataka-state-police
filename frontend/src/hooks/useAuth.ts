import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { User, LoginResponse, RegisterData } from '../types/api';

export function useLogin() {
  return useMutation({
    mutationFn: (data: { identifier: string; password: string }) =>
      api.post<LoginResponse>('/auth/login', data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) =>
      api.post<{ message: string }>('/auth/register', data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: { userId: string; otp: string }) =>
      api.post<{ message: string; verified: boolean }>('/auth/verify-otp', data),
  });
}

export function useProfile(enabled = true) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get<{ user: User }>('/auth/profile'),
    enabled,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: Partial<User>) =>
      api.put<{ message: string; user: User }>('/auth/profile', data),
  });
}
