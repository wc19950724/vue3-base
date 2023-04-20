export default [
  {
    path: "/functional",
    name: "Functional",
    redirect: "/functional/draggable",
    meta: {
      title: "功能区",
      icon: "view-list",
    },
    children: [
      {
        path: "/functional/draggable",
        name: "FunctionalDraggable",
        component: () => import("@/pages/functional/draggable/index.vue"),
        meta: { title: "拖拽" },
      },
      {
        path: "/functional/dialog",
        name: "FunctionalDialog",
        component: () => import("@/pages/functional/dialog/index.vue"),
        meta: { title: "弹窗" },
      },
      {
        path: "/functional/select",
        name: "FunctionalSelect",
        component: () => import("@/pages/functional/select/index.vue"),
        meta: { title: "选择器" },
      },
      {
        path: "/functional/canvas",
        name: "FunctionalCanvas",
        component: () => import("@/pages/functional/canvas/index.vue"),
        meta: { title: "Canvas" },
      },
      {
        path: "/functional/transition",
        name: "FunctionalTransition",
        component: () => import("@/pages/functional/transition/index.vue"),
        meta: { title: "transition" },
      },
    ],
  },
];
