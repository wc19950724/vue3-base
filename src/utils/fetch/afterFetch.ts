import { AfterFetchContext } from "@vueuse/core";

const afterFetch = async (ctx: AfterFetchContext) => {
  return ctx;
};

export default afterFetch;
