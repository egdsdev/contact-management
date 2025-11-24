import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: !!localStorage.getItem("auth_token"),
  }),
  actions: {
    async login(email, password) {
      const response = await axios.post("/api/login", { email, password }, { withCredentials: true });
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        this.isLoggedIn = true;
      }
    },
    async logout() {
      await axios.post("/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("auth_token");
      this.isLoggedIn = false;
    },
  },
});
