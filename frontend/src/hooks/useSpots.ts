import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSpots, createSpot, updateSpot, deleteSpot } from '../api';
import type { Spot, CreateSpotData, UpdateSpotData } from '../types/spot.types';

export const spotsQueryKey = ['spots'] as const;

export function useSpots() {
  return useQuery<Spot[]>({
    queryKey: spotsQueryKey,
    queryFn: async () => {
      const spots = await getSpots();
      console.log('useSpots: Fetched spots:', spots);
      return spots;
    },
  });
}

export function useCreateSpot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSpotData) => createSpot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotsQueryKey });
    },
  });
}

export function useUpdateSpot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSpotData }) =>
      updateSpot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotsQueryKey });
    },
  });
}

export function useDeleteSpot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSpot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotsQueryKey });
    },
  });
}
