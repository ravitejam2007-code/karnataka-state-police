import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ForecastData } from '../../../types/api';

export function useForecast(district?: string, months = 6) {
  const params = new URLSearchParams();
  if (district) params.set('district', district);
  params.set('months', String(months));

  return useQuery({
    queryKey: ['forecast', district, months],
    queryFn: () => api.get<ForecastData>(`/forecast?${params.toString()}`),
  });
}
