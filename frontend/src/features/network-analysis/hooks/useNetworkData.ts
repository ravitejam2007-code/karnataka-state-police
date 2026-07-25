import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { NetworkGraphData } from '../../../types/api';

export function useCaseGraph(caseId: string) {
  return useQuery({
    queryKey: ['network', 'graph', caseId],
    queryFn: () => api.get<NetworkGraphData>(`/network/case/${caseId}/graph`),
    enabled: !!caseId,
  });
}
