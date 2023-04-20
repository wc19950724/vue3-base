<template>
  <section>
    <t-button @click="openDialog">打开弹窗</t-button>
  </section>
</template>
<script lang="tsx" setup>
import { DialogPlugin } from "tdesign-vue-next";
const header = {
  render() {
    return (
      <div>
        <heart-icon />
        render Header
      </div>
    );
  },
};
const openDialog = () => {
  const dialog = DialogPlugin.confirm({
    header: (h) => h(header),
    onClose: () => {
      dialog.destroy?.();
    },
    onConfirm: () => {
      dialog.destroy?.();
    },
  });
};
</script>
<style lang="less" scoped></style>
