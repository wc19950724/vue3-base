export default [
  {
    path: "/404",
    component: () => import("@/pages/result/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hide: true,
    },
  },
];
