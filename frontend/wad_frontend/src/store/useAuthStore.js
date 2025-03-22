import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const authStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      return res.status(500).send("CheckAuth failed: " + error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const user = await axiosInstance.post("/signup", data);
      set({ authUser: user.data });
    } catch (error) {
      console.log("Error in signup: " + error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const user = await axiosInstance.post("/login", data);
      set({ authUser: user.data });
    } catch (error) {
      console.log("Error in login: " + error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
