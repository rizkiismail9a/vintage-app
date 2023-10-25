import { useAuthStore } from "../stores/auth";
import Cookies from "js-cookie";
export const attempObj = {
  checkAuth: async () => {
    const accessToken = Cookies.get("accessToken");
    const tokenExp = Cookies.get("tokenExp");
    const UID = Cookies.get("UID");
    const authStore = useAuthStore();
    if (accessToken) {
      if (tokenExp > new Date().getTime()) {
        await authStore.attemp({ UID, token: accessToken });
        return;
      } else {
        await authStore.logout();
      }
    } else {
      await authStore.logout();
      return;
    }
  },
};
