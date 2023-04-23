import { author } from "@/../package.json";

const config: SettingState = {
  mode: StateMode.dark,
  footer: `Copyright @ 2021-${new Date().getFullYear()} ${author}. All Rights Reserved`,
};

export default config;
