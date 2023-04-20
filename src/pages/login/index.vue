<template>
  <section class="login-wrapper">
    <section class="login-header"></section>
    <section class="login-container">
      <t-form
        :data="formData"
        :rules="rules"
        :label-width="0"
        @submit="onSubmit"
      >
        <t-form-item name="userName">
          <t-input
            v-model.trim="formData.userName"
            clearable
            placeholder="请输入用户名"
          >
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password">
          <t-input
            v-model.trim="formData.password"
            type="password"
            clearable
            placeholder="请输入密码"
          >
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" type="submit" block> 登录 </t-button>
        </t-form-item>
      </t-form>
    </section>
    <footer class="login-footer">
      {{ STYLE_CONFIG.footer }}
    </footer>
  </section>
</template>
<script lang="ts" setup>
import { Data, FormRule, SubmitContext } from "tdesign-vue-next";

import STYLE_CONFIG from "@/config";
import { getUserStore } from "@/store";

const userStore = getUserStore();

const formData = reactive({
  userName: "",
  password: "",
});

const rules: {
  [x: string]: FormRule[];
} = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const onSubmit = ({ validateResult }: SubmitContext<Data>) => {
  if (validateResult !== true) return;
  userStore.login(formData);
};
</script>
<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--td-bg-color-page);
  background-image: url("@/assets/login-bg-black.webp");
  background-size: cover;
  background-position: 100%;

  .login-container {
    width: 400px;
    padding: @spacer-2;

    :deep(.t-input) {
      height: @line-height-xxl;
    }

    :deep(.t-button) {
      margin-top: @line-height-xxl;
      height: @line-height-xxl;
    }
  }

  .login-footer {
    padding: @spacer-2;
    color: var(--td-font-white-2);
  }
}
</style>
