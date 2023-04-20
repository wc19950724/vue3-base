import { USER_AUTH_DATA } from "@/config/global";

import cookies from "./cookie";

const Auth = {
  getUserData: (): Partial<UserInfo> => {
    try {
      const userData = cookies.get(USER_AUTH_DATA);
      if (userData) {
        return JSON.parse(userData);
      }
      return {};
    } catch (error) {
      return {};
    }
  },

  login: async (userData: Required<UserInfo>) => {
    cookies.set(USER_AUTH_DATA, JSON.stringify(userData));
  },

  logout() {
    cookies.remove(USER_AUTH_DATA);
  },
};

export default Auth;
