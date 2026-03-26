import { create } from 'zustand';
import { haversineDistance } from '../utils/measurement';

type MeasurementStore = {
  isActive: boolean;
  points: [number, number][];
  currentCursorPos: [number, number] | null;
  totalDistance: number;
  measurementMeters: number;
  completedMeasurementsCount: number;
  pendingCompletedLayersRemoval: number;
  toggleMeasurement: () => void;
  changeMeasurementMeters: (value: number) => void;
  addPoint: (point: [number, number]) => void;
  setCursorPos: (pos: [number, number] | null) => void;
  setTotalDistance: (meters: number) => void;
  undoLastPoint: () => void;
  finishMeasurement: () => void;
  clearAllMeasurements: () => void;
  incrementCompletedMeasurements: () => void;
  deactivate: () => void;
};

const initialMeasurementState = {
  points: [] as [number, number][],
  currentCursorPos: null as [number, number] | null,
  totalDistance: 0,
  measurementMeters: 0,
};

const resetCompletedTracking = {
  completedMeasurementsCount: 0,
  pendingCompletedLayersRemoval: 0,
};

export const useMeasurementStore = create<MeasurementStore>((set) => ({
  isActive: false,
  ...initialMeasurementState,
  ...resetCompletedTracking,

  toggleMeasurement: () =>
    set((state) => ({
      isActive: !state.isActive,
      ...(state.isActive ? { ...initialMeasurementState } : {}),
    })),

  changeMeasurementMeters: (value: number) => set({ measurementMeters: value }),

  addPoint: (point) => set((state) => ({ points: [...state.points, point] })),

  setCursorPos: (pos) => set({ currentCursorPos: pos }),

  setTotalDistance: (meters) => set({ totalDistance: meters }),

  undoLastPoint: () =>
    set((state) => {
      const newPoints = state.points.slice(0, -1);
      let newTotal = 0;
      for (let i = 1; i < newPoints.length; i++) {
        newTotal += haversineDistance(newPoints[i - 1], newPoints[i]);
      }
      return {
        points: newPoints,
        totalDistance: newTotal,
        measurementMeters: newTotal,
        currentCursorPos: null,
      };
    }),

  finishMeasurement: () => set(initialMeasurementState),

  clearAllMeasurements: () =>
    set((state) => {
      const n = state.completedMeasurementsCount;
      return {
        ...initialMeasurementState,
        isActive: true,
        completedMeasurementsCount: 0,
        pendingCompletedLayersRemoval: n,
      };
    }),

  incrementCompletedMeasurements: () =>
    set((state) => ({
      completedMeasurementsCount: state.completedMeasurementsCount + 1,
    })),

  deactivate: () =>
    set({
      isActive: false,
      ...initialMeasurementState,
    }),
}));
