import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
  }),
);

export { store };

export * from "./modules/setting";
export * from "./modules/user";

export default store;
