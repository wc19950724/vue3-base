<template>
  <div>
    <t-button @click="testFetch">测试发起请求</t-button>
    <t-button @click="router.push({ name: 'DashboardDetails' })">
      去详情页
    </t-button>
    <t-divider>请求响应结果</t-divider>
    <json-viewer
      :value="resultText"
      expanded
      copyable
      sort
      boxed
      theme="jv-dark"
    ></json-viewer>
    <!-- <span>{{ resultText }}</span> -->
  </div>
</template>
<script lang="ts" setup>
import "vue3-json-viewer/dist/index.css";

import { JsonViewer } from "vue3-json-viewer";

import { getList } from "@/apis/test";

const router = useRouter();

const { data, execute } = getList();

const resultText = computed(() => data.value || {});

const testFetch = () => {
  execute();
};
</script>
