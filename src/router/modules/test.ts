export default [
  {
    path: "/Test",
    component: () => import("@/pages/dashboard/base.vue"),
    name: "Test",
    meta: {
      title: "测试页",
    },
  },
];
