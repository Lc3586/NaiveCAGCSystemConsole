<!--
简单复选框组件

按分组数据生成分组复选框
使用示例：
  <template>
    <simple-checkbox :config="config"
                     @change="handlerChange"/>
  </template>

  <script lang="ts" setup>
  import SimpleCheckbox from '@/components/SimpleCheckbox/index.vue';
  import CheckboxConfig from "@/components/SimpleCheckbox/Model/CheckboxConfig";
  import CheckboxGroupParams from "@/components/SimpleCheckbox/Model/CheckboxGroupParams";
  import CheckboxValueInfo from "@/components/SimpleCheckbox/Model/CheckboxValueInfo";

  const selectValues = {
    '分组一': [],
    '分组二': [],
    '分组三': []
  };

  const config = new CheckboxConfig().setup(config => {
    config.groups = [
      new CheckboxGroupParams().setup(params => {
              params.name = '分组一';
                params.allValues.push(new CheckboxValueInfo('选项一', 1));
                params.allValues.push(new CheckboxValueInfo('选项二', 2));
                params.allValues.push(new CheckboxValueInfo('选项三', 3));
            }),
      new CheckboxGroupParams().setup(params => {
              params.name = '分组二';
                params.allValues.push(new CheckboxValueInfo('选项一', 1));
                params.allValues.push(new CheckboxValueInfo('选项二', 2));
                params.allValues.push(new CheckboxValueInfo('选项三', 3));
            }),
      new CheckboxGroupParams().setup(params => {
              params.name = '分组三';
                params.allValues.push(new CheckboxValueInfo('选项一', 1));
                params.allValues.push(new CheckboxValueInfo('选项二', 2));
                params.allValues.push(new CheckboxValueInfo('选项三', 3));
            })
    ];
  });

  /**
   * 选中数据变更事件
   *
   * @param values 选中值集合
   * @param groupIndex 分组索引
   * @param groupName 分组名称
   */
  conse handlerChange = (values: any[], groupIndex: number, groupName: string) => {
    selectValues[groupName] = values;
  }
  </script>

@author LCTR
@date 2022-07-25
-->

<template>
  <template v-for="(group, index) in renderData.groups" :key="index">
    <el-form-item
      v-if="
        props.config.containerType === CheckboxGroupContainerType.Form表单项
      "
      :label="group.name"
    >
      <inner-item
        :index="index"
        :group="group"
        :config="props.config"
        @handleCheckAllChange="handleCheckAllChange"
        @handleCheckedChange="handleCheckedChange"
      />
    </el-form-item>
    <div v-if="props.config.containerType === CheckboxGroupContainerType.Div">
      <label class="div-label">
        {{ group.name }}
      </label>
      <inner-item
        :index="index"
        :group="group"
        :config="props.config"
        @handleCheckAllChange="handleCheckAllChange"
        @handleCheckedChange="handleCheckedChange"
      />
    </div>
  </template>
</template>

<script lang="ts" setup>
  import CheckboxConfig from '@/components/SimpleCheckbox/Model/CheckboxConfig';
  import { reactive } from 'vue';
  import CheckboxGroupInfo from '@/components/SimpleCheckbox/Model/CheckboxGroupInfo';
  import InnerItem from '@/components/SimpleCheckbox/innerItem.vue';
  import { CheckboxGroupContainerType } from '@/components/SimpleCheckbox/Model/CheckboxGroupContainerType';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 分组信息集合
     */
    groups: [] as CheckboxGroupInfo[],
  });

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 数据表Id
       */
      config: CheckboxConfig;
    }>(),
    {
      config: () => new CheckboxConfig(),
    }
  );

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 选中数据变更事件
     *
     * @param e
     * @param values 选中值集合
     * @param groupIndex 分组索引
     * @param groupName 分组名称
     */
    (e: 'change', values: any[], groupIndex: number, groupName: string): void;
  }>();

  /**
   * 全选状态变更事件
   *
   * @param selected 是否选中
   * @param index 分组索引
   */
  const handleCheckAllChange = (selected: boolean, index: number) => {
    renderData.groups[index].selectedValues = selected
      ? renderData.groups[index].allValues.map((x) => x.value)
      : [];
    renderData.groups[index].isIndeterminate = false;

    emit(
      'change',
      renderData.groups[index].selectedValues,
      index,
      renderData.groups[index].name
    );
  };

  /**
   * 多选框选中事件
   *
   * @param values 选中值集合
   * @param index 分组索引
   */
  const handleCheckedChange = (values: any[], index: number) => {
    const count = values.length;
    const total = renderData.groups[index].allValues.length;
    renderData.groups[index].checkAll = count === total;
    renderData.groups[index].isIndeterminate = count > 0 && count < total;

    emit('change', values, index, renderData.groups[index].name);
  };

  /**
   * 初始化方法
   */
  (async () => {
    for (let index = 0; index < props.config.groups.length; index++) {
      const group = props.config.groups[index];
      renderData.groups.push(
        new CheckboxGroupInfo().setup((model) => {
          model.name = group.name;
          model.allValues = group.allValues;
          model.selectedValues = group.selectedValues ?? [];
          if (model.selectedValues.length > 0) {
            model.checkAll =
              model.selectedValues.length === model.allValues.length;
            if (!model.checkAll) model.isIndeterminate = true;
          } else if (group.checkAll) {
            model.checkAll = true;
            model.isIndeterminate = false;
            model.selectedValues = group.allValues.map((x) => x.value);
          } else {
            model.checkAll = false;
            model.isIndeterminate = false;
          }

          emit('change', model.selectedValues, index, group.name);
        })
      );
    }
  })();
</script>

<style></style>
