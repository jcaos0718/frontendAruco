import { create } from 'zustand';

const useStore = create((set) => ({
  actScore: 0,
  setActScore: (score) => set({ actScore: score }),
  logIn:true,
  setlogIn: (log) => set({logIn: log }),
}));


export default useStore;