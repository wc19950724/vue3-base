<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" :key="route.name" class="page-container" />
      </keep-alive>
      <template v-else>
        <component :is="Component" :key="route.name" class="page-container1" />
      </template>
    </transition>
  </router-view>
</template>

<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
