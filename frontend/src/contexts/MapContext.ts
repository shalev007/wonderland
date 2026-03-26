import type { Map } from 'maplibre-gl';
import { createContext, useContext } from 'react';

const MapContext = createContext<Map | null | undefined>(undefined);

export const MapProvider = MapContext.Provider;

export function useMap(): Map | null {
  const map = useContext(MapContext);
  if (map === undefined) {
    throw new Error('useMap must be used within MapProvider');
  }
  return map;
}
