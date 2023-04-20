declare module "*.svg?component";

declare const __COMMITID__: string;

declare module "vue3-json-viewer" {
  import {
    AllowedComponentProps,
    App,
    Component,
    ComponentCustomProps,
    VNodeProps,
  } from "vue";
  interface JsonViewerProps {
    /** json数据 */
    value: object | Array<unknown> | string | number | boolean;
    /** 是否自动展开 */
    expanded: boolean;
    /** 默认展开层级数 */
    expandDepth: number;
    /** 是否可复制 */
    copyable: boolean | object;
    /** 是否排序 */
    sort: boolean;
    /** 是否支持收起 */
    boxed: boolean;
    /** 主题 jv-dark | jv-light */
    theme: string;
    /** 预览模式 */
    previewMode: boolean;
    /** 格式化函数 */
    timeformat: (value: unknown) => string;
  }
  type JsonViewerType = JsonViewerProps &
    VNodeProps &
    AllowedComponentProps &
    ComponentCustomProps;
  const JsonViewer: Component<JsonViewerType>;
  export { JsonViewer };
  const def: { install: (app: App) => void };
  export default def;
}
