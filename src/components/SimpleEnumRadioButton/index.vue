<!--
简单枚举值单选按钮组件

使用枚举键值对数据生成单选按钮
使用示例：
  <template>
    <simple-enum-radio-button v-model="value"
                              :enums="allTypes"/>
  </template>

  <script lang="ts" setup>
  import {reactive} from "vue";
  import SimpleEnumRadioButton from '@/components/SimpleEnumRadioButton/index.vue';

  const value = reactive('采用');

  const allTypes = {
    采用: PlateType.采用,
    特定: PlateType.特定,
    不采用: PlateType.不采用,
  };
  </script>

@author LCTR
@date 2022-07-25
-->

<template>
  <el-radio-group v-model="modelValue" @change="change">
    <el-radio-button
      v-for="(item, name) in props.enums"
      :key="name"
      :label="item"
    >
      {{ name }}
    </el-radio-button>
  </el-radio-group>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue';

  /**
   * 渲染数据
   */
  const renderData = reactive({});

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 枚举数据键值对集合
       */
      enums: Record<string, any>;
      /**
       * 选中项的值
       */
      modelValue: any;
    }>(),
    {
      enums: () => {
        return {} as Record<string, any>;
      },
      modelValue: null,
    }
  );

  /**
   * 值
   */
  const modelValue = computed((): boolean => {
    return props.modelValue;
  });

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 更新选中的值
     *
     * @param e
     * @param value 选中的值
     */
    (e: 'update:modelValue', value: any): void;
  }>();

  /**
   * 选中项变更
   *
   * @param value 选中的值
   */
  const change = (value: any) => {
    emit('update:modelValue', value);
  };
</script>

<style></style>
