import axios from 'axios';

const backendUrl =
  import.meta.env.VITE_MAGENIM_BACKEND_URL || 'http://localhost:3000';

export interface SelfLocation {
  lat: number;
  lng: number;
}

export const getSelfLocation = async (): Promise<SelfLocation | null> => {
  const response = await axios.get<SelfLocation | null>(`${backendUrl}/self-location`);
  return response.data;
};

export const updateSelfLocation = async (location: SelfLocation): Promise<void> => {
  await axios.post(`${backendUrl}/self-location`, location);
};
