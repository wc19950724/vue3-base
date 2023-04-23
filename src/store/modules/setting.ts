import { keys } from "lodash";

import STYLE_CONFIG from "@/config";
import { store } from "@/store";

const state = { ...STYLE_CONFIG };

export const useSettingStore = defineStore("setting", {
  state: () => state,
  getters: {
    displayMode: (state) => {
      if (state.mode === "auto") {
        const media = window.matchMedia("(prefers-color-scheme:dark)");
        if (media.matches) return "dark";
        return "light";
      }
      return state.mode;
    },
  },
  actions: {
    async changeMode(mode?: SettingState["mode"]) {
      let theme = mode || "auto";

      if (mode === "auto") {
        const media = window.matchMedia("(prefers-color-scheme:dark)");
        if (media.matches) {
          theme = "dark";
        } else {
          theme = "light";
        }
      }
      document.documentElement.setAttribute("theme-mode", theme);
    },
    changeBrandTheme(brandTheme: string) {
      document.documentElement.setAttribute("theme-color", brandTheme);
    },
    updateConfig(payload: Partial<SettingState>) {
      let key: keyof SettingState;
      for (key in payload) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$state[key] = payload[key];
        if (key === "mode") {
          this.changeMode(payload[key]);
        }
        // if (key === "brandTheme") {
        //   this.changeBrandTheme(payload[key]);
        // }
      }
    },
  },
  persist: {
    paths: [...keys(STYLE_CONFIG)],
  },
});

export function getSettingStore() {
  return useSettingStore(store);
}
