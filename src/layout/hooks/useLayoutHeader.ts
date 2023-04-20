import { DropdownOption, TdBreadcrumbItemProps } from "tdesign-vue-next";

import { getSettingStore, getUserStore } from "@/store";
import Auth from "@/utils/auth";

export const useBreadcrumb = () => {
  const route = useRoute();

  const router = useRouter();

  const allRoutes = router.getRoutes();

  const findParentRoute = (
    routeName: string,
    routes: TdBreadcrumbItemProps[]
  ) => {
    const routeItem = allRoutes.find((item) => item.name === routeName);
    if (routeItem) {
      routes.unshift({
        content: (routeItem.meta.title || "") as string,
        to: routeItem.path,
        router,
      });
      if (routeItem.meta.parent) {
        findParentRoute(routeItem.meta.parent as string, routes);
      }
    }
  };

  const breadcrumbOptions = computed(() => {
    let routes: TdBreadcrumbItemProps[] = [];
    if (route.meta.parent) {
      findParentRoute(route.name as string, routes);
    } else {
      routes = route.matched
        .filter((item) => item.path !== "/")
        .map((item) => ({
          content: (item.meta.title || "") as string,
          to: item.path,
          router,
        }));
    }

    if (routes.length) {
      const lastRoutesIndex = routes.length - 1;
      routes.splice(lastRoutesIndex, 1, {
        ...routes[lastRoutesIndex],
        disabled: true,
      });
    }

    return routes;
  });

  return {
    breadcrumbOptions,
  };
};

export const useHeaderSetting = () => {
  const { userName } = Auth.getUserData();

  const { logout } = getUserStore();

  const { mode, updateConfig } = getSettingStore();

  const themeMode = ref<SettingState["mode"]>(mode);

  watch(
    () => unref(themeMode),
    (mode) => {
      updateConfig({
        mode,
      });
    },
    {
      immediate: true,
    }
  );

  const dropdownOptions: DropdownOption[] = [
    {
      content: "个人中心",
      value: "mine",
      disabled: true,
    },
    {
      content: "退出登陆",
      value: "logout",
    },
  ];

  const clickHandler = (item: DropdownOption) => {
    if (item.value === "logout") {
      logout();
    }
  };

  return {
    userName,
    themeMode,
    dropdownOptions,
    clickHandler,
  };
};
