enum StateMode {
  dark = "dark",
  light = "light",
  auto = "auto",
}

interface SettingState {
  mode: StateMode;
  footer: string;
}
