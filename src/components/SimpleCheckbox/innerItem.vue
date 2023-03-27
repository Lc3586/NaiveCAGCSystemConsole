<template>
  <el-checkbox
    v-model="checkAll"
    :indeterminate="props.group.isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
  <el-divider
    v-if="props.config.useDivider"
    :border-style="props.config.dividerStyle"
  />
  <el-checkbox-group v-model="selectedValues" @change="handleCheckedChange">
    <el-checkbox
      v-for="item in props.group.allValues"
      :key="item.name"
      :label="item.value"
    >
      {{ item.name }}
    </el-checkbox>
  </el-checkbox-group>
  <el-divider
    v-if="props.config.useDivider"
    :border-style="props.config.dividerStyle"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import CheckboxGroupInfo from '@/components/SimpleCheckbox/Model/CheckboxGroupInfo';
  import CheckboxConfig from '@/components/SimpleCheckbox/Model/CheckboxConfig';

  /**
   * 组件属性
   */
  const props = defineProps<{
    /**
     * 分组索引
     */
    index: number;

    /**
     * 分组信息
     */
    group: CheckboxGroupInfo;

    /**
     * 配置
     */
    config: CheckboxConfig;
  }>();

  /**
   * 是否全选
   */
  const checkAll = computed((): boolean => {
    return props.group.checkAll;
  });

  /**
   * 选中项
   */
  const selectedValues = computed((): any[] => {
    return props.group.selectedValues;
  });

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 全选状态变更事件
     *
     * @param e
     * @param selected 是否选中
     * @param index 分组索引
     */
    (e: 'handleCheckAllChange', selected: boolean, index: number): void;

    /**
     * 多选框选中事件
     *
     * @param e
     * @param values 选中值集合
     * @param index 分组索引
     */
    (e: 'handleCheckedChange', values: any[], index: number): void;
  }>();

  /**
   * 全选状态变更事件
   *
   * @param selected 是否选中
   */
  const handleCheckAllChange = (selected: any) => {
    emit('handleCheckAllChange', selected as boolean, props.index);
  };

  /**
   * 多选框选中事件
   *
   * @param values 选中值集合
   */
  const handleCheckedChange = (values: any[]) => {
    emit('handleCheckedChange', values, props.index);
  };
</script>

<style></style>
