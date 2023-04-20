import { App, Directive } from "vue";

// 自动导入modules文件夹下所有ts文./modules/draggable
const modules = import.meta.glob<Directive>("./modules/**/*.ts", {
  eager: true,
  import: "default",
});

export const directiveList: { name: string; mod: Directive }[] = [];

Object.keys(modules).forEach((key) => {
  const name = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
  const mod = modules[key] || {};
  directiveList.push({ name, mod });
});

const directives = {
  install(app: App) {
    directiveList.forEach((item) => {
      app.directive(item.name, item.mod);
    });
  },
};

export default directives;
