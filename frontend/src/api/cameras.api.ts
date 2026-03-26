import type { Camera } from '@src/types';
import axios from 'axios';

const backendUrl =
  import.meta.env.VITE_MAGENIM_BACKEND_URL || 'http://localhost:3000';

export const getCameras = async (): Promise<Camera[]> => {
  const response = await axios.get<Camera[]>(`${backendUrl}/cameras`);
  return response.data;
};
