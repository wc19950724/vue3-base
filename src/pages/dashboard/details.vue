<template>
  <section>
    <span>事件冒泡</span>
    <section
      class="test"
      draggable="true"
      @dragstart="dragstart"
      @dragover="dragover"
      @dragend="dragend"
    >
      <span>a</span>
      <section>
        <span>b</span>
        <section>
          <span>c</span>
        </section>
      </section>
    </section>
  </section>
</template>
<script lang="ts" setup>
const dragstart = (e: DragEvent) => {
  console.log("start", e);
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = "move";
  }
};
const dragover = (e: DragEvent) => {
  console.log("over", e);
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "move";
  }
};
const dragend = (e: DragEvent) => {
  console.log("end", e);
};
</script>
<style lang="less" scoped>
.test {
  position: relative;
  width: 300px;
  height: 300px;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;

  & section {
    position: relative;
  }

  & span {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-100%);
  }

  & > section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 70%;
    background: green;

    & > section {
      width: 60%;
      height: 60%;
      background: blue;
    }
  }
}
</style>
