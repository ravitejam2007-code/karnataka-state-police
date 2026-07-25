import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { KPISummary, PaginatedCases } from '../../../types/api';

export function useDashboardKPI() {
  return useQuery({
    queryKey: ['analytics', 'kpi-summary'],
    queryFn: () => api.get<KPISummary>('/analytics/kpi-summary'),
  });
}

export const useKPISummary = useDashboardKPI;

export function useRecentCases(limit = 10) {
  return useQuery({
    queryKey: ['cases', 'recent', limit],
    queryFn: () => api.get<PaginatedCases>(`/cases?page=1&limit=${limit}`),
  });
}

