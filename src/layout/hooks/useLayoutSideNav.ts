import AssetLogoFull from "@/assets/assets-logo-full.svg?component";
import AssetLogo from "@/assets/assets-t-logo.svg?component";
import { getSettingStore } from "@/store";

export const useMenu = () => {
  const router = useRouter();

  const settingStore = getSettingStore();

  const allRoutes = router.getRoutes();

  const getExpandedMenu = () =>
    allRoutes.filter((item) => item.meta?.expanded).map((item) => item.path);

  const expanded = ref(getExpandedMenu());

  const collapsed = ref(false);

  const iconName = computed(() =>
    collapsed.value ? "chevron-right" : "chevron-left"
  );

  const changeCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  const getLogo = () => {
    if (collapsed.value) return AssetLogo;
    return AssetLogoFull;
  };

  return {
    settingStore,
    expanded,
    collapsed,
    iconName,
    changeCollapsed,
    getLogo,
    getExpandedMenu,
    allRoutes,
  };
};
