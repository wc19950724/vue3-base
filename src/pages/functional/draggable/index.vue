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
  </section>
</template>
<script lang="ts" setup>
import { DraggableValue } from "@/directives/modules/draggable";
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
