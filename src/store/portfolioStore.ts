import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeConfig } from '../types';

interface PortfolioState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  isCustomizerOpen: boolean;
  toggleCustomizer: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      activeSection: 'hero',
      setActiveSection: (section) => set({ activeSection: section }),
      projectFilter: 'all',
      setProjectFilter: (filter) => set({ projectFilter: filter }),
      theme: {
        accentHue: 250,
        accentSaturation: 90,
        fontSize: 'medium',
      },
      setTheme: (partial) =>
        set((state) => ({ theme: { ...state.theme, ...partial } })),
      isCustomizerOpen: false,
      toggleCustomizer: () =>
        set((state) => ({ isCustomizerOpen: !state.isCustomizerOpen })),
      isMobileMenuOpen: false,
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    }),
    {
      name: 'portfolio-preferences',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
