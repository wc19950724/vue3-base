<template>
  <t-menu
    v-model:expanded="expanded"
    :theme="settingStore.displayMode"
    :collapsed="collapsed"
    :value="menuValue"
  >
    <template #logo>
      <span
        :class="`${prefix}-side-nav-logo-wrapper`"
        @click="$router.push('/')"
      >
        <component
          :is="getLogo()"
          :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`"
        />
      </span>
    </template>
    <menu-content :menu="dynamicRoutes" />
    <template #operations>
      <t-icon
        class="t-menu__operations-icon"
        :name="iconName"
        @click="changeCollapsed"
      />
      <template v-if="!collapsed"> {{ name }} {{ version }} </template>
    </template>
  </t-menu>
</template>
<script lang="ts" setup>
import { isEqual, uniqWith } from "lodash";

import { name, version } from "@/../package.json";
import { prefix } from "@/config/global";
import { dynamicRoutes } from "@/router";

import { useBreadcrumb } from "../hooks/useLayoutHeader";
import { useMenu } from "../hooks/useLayoutSideNav";
import MenuContent from "./menu-content.vue";

const route = useRoute();

const {
  settingStore,
  expanded,
  collapsed,
  iconName,
  changeCollapsed,
  getLogo,
  getExpandedMenu,
  allRoutes,
} = useMenu();

const { breadcrumbOptions } = useBreadcrumb();

const menuValue = ref<string>();

watch(
  () => unref(breadcrumbOptions),
  (breadcrumbOptions) => {
    // 展示当前路由所在菜单
    const defaultExpanded = getExpandedMenu();
    const currentExpanded = breadcrumbOptions
      .filter((item) => {
        // 默认展开菜单
        if (defaultExpanded.length) {
          return defaultExpanded.indexOf(item.to as string) > -1;
        }
        // 面包屑中作为父级路由的菜单
        return allRoutes.filter(
          (it) => it.path === item.to && it.children?.length
        );
      })
      .map((item) => item.to as string);

    expanded.value = uniqWith([...expanded.value, ...currentExpanded], isEqual);

    // 选中隐藏路由父级菜单
    if (route.meta?.hide) {
      const breadcrumbPaths = breadcrumbOptions.map((item) => item.to);
      // 面包屑中未隐藏的菜单项
      const hideRouteParent = allRoutes.find((item) => {
        return breadcrumbPaths.indexOf(item.path) > -1 && !item.meta?.hide;
      });
      menuValue.value = hideRouteParent?.path;
    } else {
      menuValue.value = route.path;
    }
  },
  {
    immediate: true,
  }
);
</script>
