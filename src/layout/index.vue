<template>
  <t-layout>
    <t-aside>
      <layout-side-nav />
    </t-aside>
    <t-layout>
      <t-header>
        <layout-header />
      </t-header>
      <t-content>
        <layout-content />
      </t-content>
      <t-footer>
        <layout-footer />
      </t-footer>
    </t-layout>
  </t-layout>
</template>
<script lang="ts" setup>
import LayoutContent from "./components/layout-content.vue";
import LayoutFooter from "./components/layout-footer.vue";
import LayoutHeader from "./components/layout-header.vue";
import LayoutSideNav from "./components/layout-side-nav.vue";
</script>
<style lang="less" scoped>
.t-layout {
  width: 100%;
  height: 100%;
  background: var(--td-bg-color-container);

  :deep(&) {
    @import url("@/styles/layout.less");
  }
}
</style>
