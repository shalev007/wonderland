import { create } from 'zustand';

export const orderedMapToolKinds = ['polygon', 'line', 'dot'] as const;

export type MapToolKind = (typeof orderedMapToolKinds)[number];

type MapToolsState = {
  isOpen: boolean;
  selectedTool: MapToolKind | null;
  toggleTools: () => void;
  closeTools: () => void;
  selectTool: (tool: MapToolKind) => void;
};

export const useMapToolsStore = create<MapToolsState>((set) => ({
  isOpen: false,
  selectedTool: null,
  toggleTools: () => set((state) => ({ isOpen: !state.isOpen })),
  closeTools: () => set({ isOpen: false }),
  selectTool: (tool) =>
    set({
      selectedTool: tool,
      isOpen: true,
    }),
}));
