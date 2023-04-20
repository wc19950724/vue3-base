<template>
  <section class="select-wrapper">
    <t-divider align="left">关联不重复选择器</t-divider>
    <t-form :data="formData" :rules="rules" @submit="submitForm">
      <template v-for="(row, index) in formData.dataList" :key="index">
        <t-divider>第{{ index + 1 }}组</t-divider>
        <section class="no-repeat-select">
          <t-form-item :name="`dataList[${index}].select1`">
            <t-select v-model="formData.dataList[index].select1" clearable>
              <t-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="disableHandler(row, item, 1)"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item :name="`dataList[${index}].select2`">
            <t-select v-model="formData.dataList[index].select2" clearable>
              <t-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="disableHandler(row, item, 2)"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item :name="`dataList[${index}].select3`">
            <t-select v-model="formData.dataList[index].select3" clearable>
              <t-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="disableHandler(row, item, 3)"
              ></t-option>
            </t-select>
          </t-form-item>
        </section>
      </template>
      <t-button type="submit">表单校验</t-button>
    </t-form>
  </section>
</template>
<script lang="ts" setup>
import {
  CustomValidateResolveType,
  FormRule,
  MessagePlugin,
  SubmitContext,
  ValueType,
} from "tdesign-vue-next";

interface OptionsType {
  label: string;
  value: string;
}

interface DataListType {
  id: number;
  select1: OptionsType["value"];
  select2: OptionsType["value"];
  select3: OptionsType["value"];
}

const options1 = ref<OptionsType[]>([
  { label: "选择器1-1", value: "1-1" },
  { label: "选择器1-2", value: "1-2" },
]);
const options2 = ref([
  { label: "选择器2-1", value: "2-1" },
  { label: "选择器2-2", value: "2-2" },
]);
const options3 = ref([
  { label: "选择器3-1", value: "3-1" },
  { label: "选择器3-2", value: "3-2" },
]);

const disableHandler = (
  row: DataListType,
  option: OptionsType,
  type: number
) => {
  if (type === 1) {
    if (row.select2 && row.select3) {
      return formData.dataList.some(
        (item) =>
          item.select1 === option.value &&
          item.select2 === row.select2 &&
          item.select3 === row.select3
      );
    }
  } else if (type === 2) {
    if (row.select1 && row.select3) {
      return formData.dataList.some(
        (item) =>
          item.select1 === row.select1 &&
          item.select2 === option.value &&
          item.select3 === row.select3
      );
    }
  } else if (type === 3) {
    if (row.select1 && row.select2) {
      return formData.dataList.some(
        (item) =>
          item.select1 === row.select1 &&
          item.select2 === row.select2 &&
          item.select3 === option.value
      );
    }
  }
  return false;
};

const formData = reactive<{
  dataList: DataListType[];
}>({
  dataList: [
    {
      id: 1,
      select1: "1-2",
      select2: "2-1",
      select3: "3-2",
    },
    {
      id: 2,
      select1: "1-2",
      select2: "2-1",
      select3: "",
    },
    {
      id: 3,
      select1: "",
      select2: "2-1",
      select3: "3-2",
    },
  ],
});

const selectValidator = (val: ValueType): CustomValidateResolveType =>
  val
    ? { result: true, message: "正确了", type: "success" }
    : {
        result: false,
        message: "请选择！！！",
        type: "error",
      };

const rules: { [field in keyof DataListType]?: Array<FormRule> } = {
  select1: [
    {
      validator: selectValidator,
    },
  ],
  select2: [
    {
      validator: selectValidator,
    },
  ],
  select3: [
    {
      validator: selectValidator,
    },
  ],
};

const submitForm = ({ e, firstError, validateResult }: SubmitContext) => {
  e?.preventDefault();
  if (validateResult === true) {
    MessagePlugin.success("校验通过");
  } else {
    MessagePlugin.warning(firstError || "校验失败");
  }
};
</script>
<style lang="less" scoped>
.select-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .no-repeat-select {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;

    & > div {
      width: auto;
    }
  }
}
</style>
