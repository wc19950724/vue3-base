<template>
  <section class="t-layout__header-left">
    <t-breadcrumb :options="breadcrumbOptions">
      <template #separator>
        <slash-icon />
      </template>
    </t-breadcrumb>
  </section>
  <section class="t-layout__header-right">
    <t-space align="center" separator="|">
      <t-switch
        v-model="themeMode"
        :custom-value="['dark', 'light']"
        :label="switchLabel"
        size="large"
      />
      <t-dropdown
        :options="dropdownOptions"
        trigger="click"
        max-column-width="none"
        placement="left-top"
        @click="clickHandler"
      >
        <t-button variant="text">
          {{ userName }}
        </t-button>
      </t-dropdown>
    </t-space>
  </section>
</template>
<script lang="ts" setup>
import { useBreadcrumb, useHeaderSetting } from "../hooks/useLayoutHeader";

const { breadcrumbOptions } = useBreadcrumb();

const { userName, themeMode, dropdownOptions, clickHandler, switchLabel } =
  useHeaderSetting();
</script>
