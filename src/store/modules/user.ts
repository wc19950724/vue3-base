import { mockLogin } from "@/apis/login";
import { useLoading } from "@/hooks/useLoading";
import router from "@/router";
import { store } from "@/store";
import { debounceMessage } from "@/utils";
import Auth from "@/utils/auth";

const { showLoading, hideLoading } = useLoading();

export const useUserStore = defineStore("user", {
  actions: {
    // 登陆
    async login(userInfo: Parameters<typeof mockLogin>[0]) {
      const res = await mockLogin(userInfo);
      if (res.code === 200) {
        await Auth.login(res.data);
        router.push({ path: "/" });
      } else {
        await debounceMessage(res.message);
        return res;
      }
    },
    // 退出登陆
    async logout(showMsg = true) {
      showLoading({
        fullscreen: true,
      });
      Auth.logout();
      if (showMsg) {
        await debounceMessage("退出成功, 正在跳转到登录页……", "success");
      }
      router.push({ path: "/login" });
      hideLoading();
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
