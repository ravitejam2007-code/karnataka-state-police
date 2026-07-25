import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { GeoJSONFeatureCollection } from '../../../types/api';

export interface MapFilters {
  district?: string;
  from?: string;
  to?: string;
  crimeType?: string;
  status?: string;
}

export function useCrimePoints(filters: MapFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, String(v));
  });
  const queryString = params.toString();
  const path = `/map/crime-points${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: ['map', 'crime-points', filters],
    queryFn: () => api.get<GeoJSONFeatureCollection>(path),
  });
}
