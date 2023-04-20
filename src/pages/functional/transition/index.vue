<template>
  <section class="transition-wrapper">
    <TransitionGroup tag="sction" name="list" class="transition-list">
      <section v-for="item in list" :key="item.id" class="transition-list-item">
        <span>{{ item.name }}</span>
      </section>
    </TransitionGroup>
  </section>
</template>
<script lang="ts" setup>
import { uniqueId } from "lodash";

const list = ref([
  {
    id: uniqueId(),
    name: "随机名称" + uniqueId(),
  },
  {
    id: uniqueId(),
    name: "随机名称" + uniqueId(),
  },
  {
    id: uniqueId(),
    name: "随机名称" + uniqueId(),
  },
]);
const pushLength = ref(0);
onMounted(() => {
  setInterval(async () => {
    const leng = Math.floor(Math.random() * 5 + 1);
    const newList = Array(leng)
      .fill(null)
      .map(() => ({
        id: uniqueId(),
        name: "随机名称" + uniqueId(),
      }));
    pushLength.value = leng;
    list.value = [...newList, ...list.value];
    await nextTick();
    list.value.splice(leng);
  }, 3000);
});
</script>
<style lang="less" scoped>
.transition-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .transition-list {
    .list-move, /* 对移动中的元素应用的过渡 */
    .list-enter-active,
    .list-leave-active {
      transition: all 3s ease;
    }

    .list-enter-from {
      opacity: 0;
      transform: translateY(calc(v-bind("pushLength") * -100%));
    }
    .list-leave-to {
      opacity: 0;
      transform: translateY(0);
    }

    // .list-leave-active.list-move {
    //   transition: none;
    // }

    /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */

    .transition-list-item {
      padding-top: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
