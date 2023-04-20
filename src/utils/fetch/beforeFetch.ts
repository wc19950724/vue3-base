import { BeforeFetchContext } from "@vueuse/core";

import router from "@/router";
import { useUserStore } from "@/store";

import { debounceMessage } from "..";
import Auth from "../auth";
const { logout } = useUserStore();

const beforeFetch = async ({ options, cancel }: BeforeFetchContext) => {
  const { token } = Auth.getUserData();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  } else if (
    !(unref(router.currentRoute).meta as BaseRouteRecord["meta"])?.notAuth
  ) {
    cancel();
    await debounceMessage("当前用户不存在，即将跳转到登录页……");
    logout(false);
  }
  return { options };
};

export default beforeFetch;
