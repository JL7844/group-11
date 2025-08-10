import { create } from 'zustand';

type User = { id: string; name: string; role: 'CLIENT'|'LAWYER'|'ADMIN'; token?: string };

type AppState = { user?: User; setUser: (u?: User) => void };

export const useAppStore = create<AppState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user })
}));