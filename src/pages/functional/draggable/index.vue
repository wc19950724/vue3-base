<template>
  <section class="draggable-wrapper">
    <section v-draggable="dragConfig1" class="draggable-base base1">
      基础拖拽1 html
    </section>
    <section v-draggable="dragConfig2" class="draggable-base base2">
      基础拖拽2 page
    </section>
    <section v-draggable="dragConfig3" class="draggable-base base3">
      基础拖拽3 none 拖拽模式: {{ dragConfig3.mode || "move" }}
    </section>

    <t-button @click="dialogVisible = true">打开弹窗 - 指定拖拽元素</t-button>
    <t-dialog
      v-draggable="dragConfig4"
      attach="body"
      :visible="dialogVisible"
      :close-on-esc-keydown="false"
      :close-on-overlay-click="false"
      @close="dialogVisible = false"
      @confirm="dialogVisible = false"
    >
      <t-button @click="changeDragConfig4">改变拖拽方式</t-button>
      拖拽模式: {{ dragConfig4.mode || "move" }}
    </t-dialog>
  </section>
</template>
<script lang="ts" setup>
import { DraggableValue } from "@/directives/modules/draggable";
const dialogVisible = ref(false);

const dragConfig1 = ref<DraggableValue>({
  dragstart: (e) => {
    console.log(e, "start");
  },
  dragmove: (e) => {
    console.log(e, "move");
  },
  dragend: (e) => {
    console.log(e, "end");
  },
});

const dragConfig2 = ref<DraggableValue>({
  parentEl: ".draggable-wrapper",
});

const dragConfig3 = ref<DraggableValue>({
  isExceed: true,
  mode: "drag",
});

const dragConfig4 = ref<DraggableValue>({
  el: ".t-dialog",
  parentEl: ".draggable-wrapper",
  dragend: async (e) => {
    await Promise.resolve();
    console.log(e, "Promise end");
  },
});

const changeDragConfig4 = () => {
  dragConfig4.value.mode = dragConfig4.value.mode === "move" ? "drag" : "move";
};
</script>
<style lang="less" scoped>
.draggable-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .draggable-base {
    position: absolute;
    border-radius: 6px;
    padding: 5px 8px;
    box-sizing: border-box;
    z-index: 1;
    background: var(--td-bg-color-component);
    white-space: nowrap;
    &.base1 {
      left: 50px;
      top: 80px;
    }
    &.base2 {
      left: 150px;
      top: 180px;
    }
    &.base3 {
      left: 250px;
      top: 280px;
    }
  }

  .dragging {
    background: var(--td-bg-color-component-active);
  }
}
</style>
