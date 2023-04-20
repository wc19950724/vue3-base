// import { MessagePlugin } from "tdesign-vue-next";
import "nprogress/nprogress.css";

import NProgress from "nprogress";

import router from "@/router";
import Auth from "@/utils/auth";

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();

  const { token } = Auth.getUserData();
  if (token) {
    next();
    NProgress.done();
  } else if (to.meta.notAuth) {
    next();
    NProgress.done();
  } else {
    Auth.logout();
    next({ path: "/login" });
    NProgress.done();
  }
});
