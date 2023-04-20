import { isElement, isObject, throttle } from "lodash";
import { cloneDeep } from "lodash";
import { MessagePlugin, MessageThemeList } from "tdesign-vue-next";

/** 全局消息防抖 */
export const debounceMessage = throttle(
  (errMsg: string, theme: MessageThemeList = "error") =>
    new Promise<void>((resolve) => {
      MessagePlugin(theme, {
        content: errMsg || "系统异常, 请稍后重试",
        duration: 3000,
        onDurationEnd: () => resolve(),
      });
    }),
  3000,
  {
    leading: true,
    trailing: false,
  }
);

/** 递归处理对象 */
export const reforObj = <T extends object, F extends (arg: T) => void>(
  obj: T,
  fn: F
) => {
  fn(obj);
  for (const key in obj) {
    isObject(obj[key]) && !isElement(obj[key]) && reforObj(obj[key] as T, fn);
  }
};

/** 冻结回调参数 */
export const freezeCallbackParams = async <
  T extends object,
  F extends (arg: T) => void | Promise<unknown>
>(
  params: T,
  fn?: F
) => {
  try {
    /** 冻结回调参数，不可修改 */
    const freezeValue = cloneDeep(params);
    reforObj(freezeValue, (obj) => {
      Object.freeze(obj);
    });
    await fn?.(freezeValue);
    return Promise.resolve();
  } catch (error) {
    console.error(`不能修改回调参数：${error?.["message"] as string}`);
    return Promise.reject(error);
  }
};
