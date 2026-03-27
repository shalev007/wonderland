import { create } from 'zustand';

interface MapContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number } | null;
  lngLat: { lng: number; lat: number } | null;
  openMenu: (x: number, y: number, lng: number, lat: number) => void;
  closeMenu: () => void;
}

export const useMapContextMenu = create<MapContextMenuState>((set) => ({
  isOpen: false,
  position: null,
  lngLat: null,
  openMenu: (x, y, lng, lat) => set({ isOpen: true, position: { x, y }, lngLat: { lng, lat } }),
  closeMenu: () => set({ isOpen: false }),
}));
