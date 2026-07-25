import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { SearchResult } from '../../../types/api';

export function useSearch(query: string, type = 'all') {
  return useQuery({
    queryKey: ['search', query, type],
    queryFn: () => api.get<SearchResult>(`/search?q=${encodeURIComponent(query)}&type=${type}`),
    enabled: !!query && query.trim().length > 0,
  });
}
