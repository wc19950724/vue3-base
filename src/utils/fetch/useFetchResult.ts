import router from "@/router";
import { useUserStore } from "@/store";

import { debounceMessage } from "..";
import useFetch, { PostFetchOption } from ".";

const { logout } = useUserStore();

type FetchResult = ReturnType<typeof useFetch>;

const ERROR_ID_PARSE_RESPONSE = "parseResponseError";

export const isFetchParseError = (err: unknown): boolean => {
  if (err instanceof Error) {
    return err["id"] === ERROR_ID_PARSE_RESPONSE && err["data"] !== undefined;
  }

  return false;
};

export const defaultAutoHandleLocalError = <T extends FetchResult>(
  err: Error,
  result: T
) => {
  const { aborted, statusCode } = result;

  let message = err.message || "服务端错误";

  if (aborted.value) {
    message = "无法连接服务器";

    const { meta }: { meta: BaseRouteRecord["meta"] } = unref(
      router.currentRoute
    );
    if (!meta.notAuth) {
      setTimeout(() => {
        logout(false);
      }, 100);
    }
  } else if (statusCode.value === 500) {
    message = "服务端错误(500)";
  }
  debounceMessage(message);
};
export const useFetchResult = <T extends FetchResult>(
  fetchResult: T,
  option?: Pick<
    PostFetchOption,
    "autoHandleLocalError" | "autoHandleNoPermissionError"
  >
): T => {
  const { onFetchError } = fetchResult;

  const { autoHandleLocalError, autoHandleNoPermissionError } = option || {};

  onFetchError((err) => {
    if (isFetchParseError(err)) {
      const {
        data: { code },
      } = err;
      if ([401010002, 401000000].includes(code)) {
        logout();
      }

      // Auto-show no-permission error if allow
      if (autoHandleNoPermissionError) {
        debounceMessage(err.message);
      }

      return;
    }

    // Auto-show error if allow
    if (autoHandleLocalError) {
      defaultAutoHandleLocalError(err, fetchResult);
    }
  });

  return fetchResult;
};
