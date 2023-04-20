declare type EnumToUnion<T extends string> = `${T}`;

declare type BaseRouteRecord = import("vue-router").RouteRecordRaw & {
  meta?: {
    /** 在菜单栏隐藏路由 */
    hide?: boolean;
    /** 路由图标 */
    icon?: string;
    /** 路由标题 */
    title?: string;
    /** 路由排序 */
    sort?: number;
    /** 父路由Name */
    parent?: string;
    /** 路由缓存 */
    keepAlive?: boolean;
    /** 无需授权 */
    notAuth?: boolean;
  };
};
