import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { Case, CaseDetail, PaginatedCases } from '../../../types/api';

export interface CaseFilters {
  page?: number;
  limit?: number;
  status?: string;
  district?: string;
  from?: string;
  to?: string;
  search?: string;
  crimeType?: string;
  officer?: string;
}

export function useCasesList(filters: CaseFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  });
  const queryString = params.toString();
  const path = `/cases${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: ['cases', filters],
    queryFn: () => api.get<PaginatedCases>(path),
  });
}

export function useCaseDetail(id: string) {
  return useQuery({
    queryKey: ['case', id],
    queryFn: () => api.get<CaseDetail>(`/cases/${id}`),
    enabled: !!id,
  });
}

export function useCreateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Case>) => api.post<{ message: string; caseMasterID: string }>('/cases', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}

export function useUpdateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Case> }) =>
      api.put<{ message: string; record: Case }>(`/cases/${id}`, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['cases'] });
      qc.invalidateQueries({ queryKey: ['case', variables.id] });
    },
  });
}

export function useDeleteCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<{ message: string }>(`/cases/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cases'] });
    },
  });
}
