import { getCameras } from '@api';
import type { Camera } from '@src/types';
import { useQuery } from '@tanstack/react-query';

export const camerasQueryKey = ['cameras'] as const;

export function useCameras() {
  return useQuery<Camera[]>({
    queryKey: camerasQueryKey,
    queryFn: getCameras,
  });
}
