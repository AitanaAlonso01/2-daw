import { create } from "zustand/react"
import { sendRequest } from "../utils/functions";

const useUserStore = create((set) => ({
  user: null,   
  loadingUser: true,   // 👈 NUEVO

  setUser: (userData) => set({ user: userData, loadingUser: false }),

  logout: () => set({ user: null, loadingUser: false }),

  cargarUsuarioLogueado: async () => {
    try {
      const res = await sendRequest("GET","/users/me");

      if(res.success){
        set({ user: res.data.user, loadingUser: false });
      } else {
        set({ user: null, loadingUser: false });
      }
    } catch (error) {
      set({ user: null, loadingUser: false });
    }
  }
}));

export default useUserStore;