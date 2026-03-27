import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface CameraUpdate {
  id: string;
  azimuth: number;
  fov: number;
}

export const useCameraUpdates = () => {
  const [updates, setUpdates] = useState<Record<string, CameraUpdate>>({});

  useEffect(() => {
    // Assuming backend runs on the same host, port 3000
    const socket: Socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to camera websocket');
    });

    socket.on('cameraUpdate', (data: CameraUpdate) => {
      setUpdates((prev) => ({
        ...prev,
        [data.id]: data,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return updates;
};
