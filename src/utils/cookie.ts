import Cookies from "js-cookie";

const cookies = {
  /**
   * @description 存储 cookie 值
   * @param {String} name cookie name
   * @param {String} value cookie value
   * @param {Object} setting cookie setting
   */
  set(name: string, value: string, settings = {}) {
    const defaultCookieSetting = {
      expires: 1,
      path: "/",
    };
    const cookieSettings = {
      ...defaultCookieSetting,
      ...settings,
    };
    Cookies.set(name, value, cookieSettings);
  },

  /**
   * @description 获取 cookie 值
   * @param {String} name cookie name
   */
  get(name: string) {
    return Cookies.get(name);
  },

  /**
   * @description 删除 cookie
   * @param {String} name cookie name
   */
  remove(name: string) {
    return Cookies.remove(name, { path: "/" });
  },
};

export default cookies;
