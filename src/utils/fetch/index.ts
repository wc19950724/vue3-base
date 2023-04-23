import { createFetch, MaybeRefOrGetter, UseFetchOptions } from "@vueuse/core";

import afterFetch from "./afterFetch";
import beforeFetch from "./beforeFetch";
import { useFetchResult } from "./useFetchResult";

export declare interface PostFetchOption {
  responseDataType?: EnumToUnion<ResponseDataTypes>;
  autoHandleLocalError?: boolean;
  autoHandleNoPermissionError?: boolean;
}
declare interface PostFetchPayLoadConfig {
  payload?: MaybeRefOrGetter<unknown>;
  type?: string;
}

declare interface UseFetchParams extends PostFetchOption {
  options?: RequestInit;
  useFetchOptions?: UseFetchOptions;
}

const useFetch = createFetch({
  options: {
    immediate: false,
    beforeFetch,
    afterFetch,
  },
});

export const usePostFetch = <T>(
  url: MaybeRefOrGetter<string>,
  payloadConfig: PostFetchPayLoadConfig,
  UseFetchParams?: UseFetchParams
) => {
  const { payload, type } = payloadConfig;
  const {
    responseDataType = "json",
    autoHandleLocalError = true,
    autoHandleNoPermissionError = true,
    options = {},
    useFetchOptions = {},
  } = UseFetchParams || {};
  const result = useFetch<T>(url, options, useFetchOptions)
    .post(payload, type)
    [responseDataType]();
  return useFetchResult(result, {
    autoHandleLocalError,
    autoHandleNoPermissionError,
  });
};

export const useGetFetch = <T>(
  url: MaybeRefOrGetter<string>,
  UseFetchParams?: UseFetchParams
) => {
  const {
    responseDataType = "json",
    autoHandleLocalError = true,
    autoHandleNoPermissionError = true,
    options = {},
    useFetchOptions = {},
  } = UseFetchParams || {};
  const result = useFetch<T>(url, options, useFetchOptions)
    .get()
    [responseDataType]();
  return useFetchResult(result, {
    autoHandleLocalError,
    autoHandleNoPermissionError,
  });
};

export default useFetch;
