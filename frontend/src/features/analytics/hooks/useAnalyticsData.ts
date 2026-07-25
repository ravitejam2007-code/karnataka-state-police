import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type {
  KPISummary,
  CrimeTypeDistribution,
  DistrictAnalysis,
  DemographicsData,
  SeasonalityData,
  BehaviorSlot
} from '../../../types/api';

export function useKPISummary() {
  return useQuery({
    queryKey: ['analytics', 'kpi-summary'],
    queryFn: () => api.get<KPISummary>('/analytics/kpi-summary'),
  });
}

export function useCrimeTypeDistribution() {
  return useQuery({
    queryKey: ['analytics', 'crime-types'],
    queryFn: () => api.get<CrimeTypeDistribution[]>('/analytics/crime-types'),
  });
}

export function useDistrictAnalysis() {
  return useQuery({
    queryKey: ['analytics', 'district'],
    queryFn: () => api.get<DistrictAnalysis[]>('/analytics/district'),
  });
}

export function useDemographics(type: 'victim' | 'accused' = 'victim') {
  return useQuery({
    queryKey: ['analytics', 'demographics', type],
    queryFn: () => api.get<DemographicsData>(`/analytics/demographics?type=${type}`),
  });
}

export function useSeasonality() {
  return useQuery({
    queryKey: ['analytics', 'seasonality'],
    queryFn: () => api.get<SeasonalityData[]>('/analytics/seasonality'),
  });
}

export function useBehaviorAnalysis() {
  return useQuery({
    queryKey: ['analytics', 'behavior'],
    queryFn: () => api.get<BehaviorSlot[]>('/analytics/behavior'),
  });
}
