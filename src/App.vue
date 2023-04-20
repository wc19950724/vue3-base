<template>
  <router-view :class="[mode]" />
</template>
<script lang="ts" setup>
import { getSettingStore } from "./store";

const settingStore = getSettingStore();

const mode = computed(() => settingStore.displayMode);
</script>
