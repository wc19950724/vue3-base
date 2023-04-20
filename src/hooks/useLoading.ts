import { LoadingMethod, LoadingPlugin } from "tdesign-vue-next";

export const useLoading = () => {
  const loadingInstance = ref<ReturnType<LoadingMethod>>();

  const showLoading = (options: Parameters<LoadingMethod>[0]) => {
    loadingInstance.value = LoadingPlugin(options);
    return loadingInstance.value;
  };

  const hideLoading = (instance?: ReturnType<LoadingMethod>) => {
    instance ? instance.hide() : loadingInstance.value?.hide();
  };

  return {
    instance: loadingInstance,
    showLoading,
    hideLoading,
  };
};
