import { create } from 'zustand';

export const AppPage = {
  HOME: 'home',
} as const;

export type AppPage = (typeof AppPage)[keyof typeof AppPage];

type NavigationStore = {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPage: AppPage.HOME,
  setCurrentPage: (page) => set({ currentPage: page }),
}));