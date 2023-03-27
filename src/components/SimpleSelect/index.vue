<!--
简单选择器组件

使用枚举键值对数据生成单选按钮
使用示例：
  <template>
    <simple-select :method="getSelectOptionList"
                   v-model="value"
                   placeholder="请选择数据"/>
  </template>

  <script lang="ts" setup>
  import {reactive} from "vue";
  import SimpleSelect from '@/components/SimpleSelect/index.vue';

  const value = reactive(0);

  const getSelectOptionList = async () : Promise<SelectOptionDTO[]> => {
    return new Promise<SelectOptionDTO[]>((resolve, reject) => {
      request({
        url: '/test/select-option-list',
        method: 'get'
      }).then((response: any) => {
        resolve((response as RuoyiAjaxResultDTO_T<SelectOptionDTO[]>).data);
      }).catch(error => {
        console.error(error);
        reject(new Error('获取下拉选择框选项集合失败.'));
      });
    });
  }
  </script>

@author LCTR
@date 2022-07-25
-->

<template>
  <el-select
    v-if="props.type === SelectType.普通选择器"
    v-model="modelValue"
    :placeholder="props.placeholder"
    remote
    :loading="renderData.loading"
    @change="change"
    :no-data-text="renderData.error"
    :multiple="props.multiple"
  >
    <el-option
      v-for="item in renderData.optionList"
      :key="item.text"
      :label="item.text"
      :value="item.value"
    />
  </el-select>

  <el-tree-select
    v-if="props.type === SelectType.树状选择器"
    :disabled="props.disabled"
    v-model="modelValue"
    :placeholder="props.placeholder"
    remote
    :loading="renderData.loading"
    @change="change"
    :no-data-text="renderData.error"
    :empty-text="renderData.error"
    :data="renderData.treeOptionList"
    :props="{ label: 'text' }"
    check-strictly
    :render-after-expand="true"
    clearable
    style="width: 100%"
  />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';
  import TreeSelectOptionDTO from '@/api/dto/utils/response/TreeSelectOptionDTO';
  import { SelectType } from '@/components/SimpleSelect/Model/SelectType';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 错误信息
     */
    error: '加载失败',
    /**
     * 选项集合
     */
    optionList: [] as SelectOptionDTO<any>[],
    /**
     * 选项集合
     */
    treeOptionList: [] as TreeSelectOptionDTO<any>[],
  });

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 加载选项集合的方法
       */
      loadOptions: () => Promise<
        SelectOptionDTO<any>[] | TreeSelectOptionDTO<any>[]
      >;
      /**
       * 选中项的值
       */
      modelValue: any;
      /**
       * 提示信息
       */
      placeholder?: string;
      /**
       * 选择器类型
       */
      type?: SelectType;
      /**
       * 多选
       */
      multiple: boolean;
      /**
       * 是否禁用
       */
      disabled?: boolean;
    }>(),
    {
      loadOptions: async () =>
        [] as SelectOptionDTO<any>[] | TreeSelectOptionDTO<any>[],
      modelValue: null,
      placeholder: '请选择',
      type: SelectType.普通选择器,
      multiple: false,
      disabled: false,
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

  /**
   * 初始化方法
   */
  (async () => {
    //获取下拉选择框数据
    try {
      switch (props.type) {
        case SelectType.树状选择器:
          renderData.treeOptionList =
            (await props.loadOptions()) as TreeSelectOptionDTO<any>[];
          break;
        default:
        case SelectType.普通选择器:
          renderData.optionList =
            (await props.loadOptions()) as SelectOptionDTO<any>[];
          break;
      }

      renderData.loading = false;
    } catch (error: any) {
      console.error(error);
      renderData.loading = false;
      if (error.message) renderData.error = error.message;
    }
  })();
</script>

<style></style>
