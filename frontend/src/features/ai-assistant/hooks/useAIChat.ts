import { useMutation } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { AIChatResponse } from '../../../types/api';

export function useAIChat() {
  return useMutation({
    mutationFn: (data: { message: string; history?: unknown[] }) =>
      api.post<AIChatResponse>('/ai/chat', data),
  });
}
