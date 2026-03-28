import { axiosInstance } from './axios';
import type { Spot, CreateSpotData, UpdateSpotData } from '../types/spot.types';

export const getSpots = async (): Promise<Spot[]> => {
  const { data } = await axiosInstance.get<Spot[]>('/spots');
  return data;
};

export const createSpot = async (data: CreateSpotData): Promise<Spot> => {
  const { data: spot } = await axiosInstance.post<Spot>('/spots', data);
  return spot;
};

export const updateSpot = async (id: number, data: UpdateSpotData): Promise<Spot> => {
  const { data: spot } = await axiosInstance.patch<Spot>(`/spots/${id}`, data);
  return spot;
};

export const deleteSpot = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/spots/${id}`);
};
